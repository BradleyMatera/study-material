const ssmlTextarea = document.getElementById("ssml");
const outputPre = document.getElementById("output");
const previewBtn = document.getElementById("preview");
const speakBtn = document.getElementById("speak");

const SAMPLE_STEPS_URL = "steps.json";

async function requestLiveSteps(ssml) {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    try {
      const response = await fetch('http://localhost:3000/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: ssml
      });
      if (!response.ok) throw new Error('Local parser responded with an error.');
      return await response.json();
    } catch (error) {
      console.warn('Falling back to sample steps:', error);
    }
  }
  return null;
}

async function fetchSteps(ssml) {
  const live = await requestLiveSteps(ssml);
  if (live) return live;
  const response = await fetch(`${SAMPLE_STEPS_URL}?cache=${Date.now()}`);
  if (!response.ok) {
    throw new Error('steps.json missing. Run npm run build and regenerate the sample data.');
  }
  return response.json();
}

function formatSteps(steps) {
  return JSON.stringify(steps, null, 2);
}

function mapProsodyRate(rate) {
  switch (rate) {
    case "x-slow":
      return 0.6;
    case "slow":
      return 0.8;
    case "medium":
      return 1;
    case "fast":
      return 1.25;
    case "x-fast":
      return 1.5;
    default:
      return 1;
  }
}

function mapVolume(volume) {
  switch (volume) {
    case "x-soft":
      return 0.3;
    case "soft":
      return 0.6;
    case "medium":
      return 1;
    case "loud":
      return 1.2;
    case "x-loud":
      return 1.35;
    default:
      return 1;
  }
}

function speakSteps(steps) {
  if (!("speechSynthesis" in window)) {
    alert("Speech Synthesis API is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const queue = [...steps];

  const speakNext = () => {
    if (!queue.length) {
      return;
    }

    const step = queue.shift();

    if (step.breakMs) {
      setTimeout(speakNext, step.breakMs);
      return;
    }

    if (step.text) {
      const utterance = new SpeechSynthesisUtterance(step.text);
      if (step.prosody?.rate) utterance.rate = mapProsodyRate(step.prosody.rate);
      if (step.prosody?.pitch) utterance.pitch = step.prosody.pitch === "low" ? 0.8 : step.prosody.pitch === "high" ? 1.2 : 1;
      if (step.prosody?.volume) utterance.volume = Math.min(mapVolume(step.prosody.volume), 1);
      if (step.emphasis) utterance.pitch = step.emphasis === "strong" ? 1.25 : step.emphasis === "reduced" ? 0.9 : utterance.pitch;
      utterance.onend = speakNext;
      window.speechSynthesis.speak(utterance);
      return;
    }

    speakNext();
  };

  speakNext();
}

async function previewSteps() {
  try {
    const ssml = ssmlTextarea.value.trim();
    const steps = await fetchSteps(ssml);
    outputPre.textContent = formatSteps(steps);
    return steps;
  } catch (error) {
    outputPre.textContent = `Error: ${error.message}`;
    return [];
  }
}

previewBtn.addEventListener("click", previewSteps);

speakBtn.addEventListener("click", async () => {
  const steps = await previewSteps();
  if (steps.length) speakSteps(steps);
});

// Load preview immediately so visitors see output
previewSteps().catch(console.error);
