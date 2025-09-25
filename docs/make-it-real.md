# Make It Real (Interactive Demo Guide)
Turn your tokenizer/parser/transformer into a small web experience with buttons, voice playback, and a GitHub Pages deployment. The repository already ships with a starter demo (`docs/demo/`)—customize it or rebuild it from scratch using the steps below.

## 1. Explore The Included Demo
Open `docs/demo/` and you’ll find:
- `index.html` – UI with textarea, “Preview Steps”, and “Speak It” buttons.
- `style.css` – Glassmorphism-inspired styling that looks great on dark backgrounds.
- `app.js` – Fetches `steps.json`, shows the parsed output, and uses the Web Speech API to speak the text while honoring `breakMs`, `prosody.rate`, and `emphasis` hints.
- `steps.json` – Sample output from your pipeline to keep the static site self-contained.

Visiting `https://<you>.github.io/study-material/demo/` (after Pages deploys) will showcase the demo immediately.

## 2. Regenerate `steps.json` From Your Parser
Want the demo to reflect your latest logic? Rebuild the steps file whenever you update the transformer.

```bash
# Make sure the TypeScript is built
npm run build

# Pipe SSML into your compiled script and overwrite the sample
printf '<speak>Hello <break time="300ms"/>world</speak>' | \
  node dist/main.js > docs/demo/steps.json
```

Open `docs/demo/steps.json` to confirm it contains a JSON array. The Web UI will read this file when running on GitHub Pages.

## 3. Make The Preview Button Parse Live Input (Local Dev)
When you run the repo locally, you can wire the demo to parse whatever is typed into the textarea. A tiny Express gateway relays the SSML text to your compiled Node script.

```bash
npm install express
cat <<'JS' > server.js
const express = require('express');
const { spawn } = require('child_process');

const app = express();
app.use(express.text({ type: 'text/plain' }));

app.post('/parse', (req, res) => {
  const child = spawn('node', ['dist/main.js'], { stdio: ['pipe', 'pipe', 'pipe'] });
  child.stdin.end(req.body);
  let data = '';
  child.stdout.on('data', chunk => (data += chunk));
  child.stderr.on('data', chunk => console.error(chunk.toString()));
  child.on('exit', code => {
    if (code === 0) {
      res.type('application/json').send(data);
    } else {
      res.status(400).send({ error: 'Parsing failed' });
    }
  });
});

app.listen(3000, () => console.log('Demo server listening on http://localhost:3000'));
JS

node server.js
```

The shipped `docs/demo/app.js` detects `localhost` and will POST to `/parse` when available, falling back to `steps.json` (the static bundle) otherwise.

## 4. Understand The Front-End Logic
Key pieces inside `docs/demo/app.js`:
- `fetchSteps(ssml)` – Calls the local `/parse` endpoint when available, otherwise fetches `steps.json` from GitHub Pages.
- `speakSteps(steps)` – Uses `window.speechSynthesis` to queue utterances, inserting delays for `breakMs`.
- `mapProsodyRate` / `mapVolume` – Approximate SSML prosody hints by adjusting the speech rate, pitch, and volume.
- Auto-preview – As soon as the page loads, it renders the JSON so reviewers see immediate value.

Talk through this flow when demoing: **textarea → preview → JSON** and **JSON → Speak**.

## 5. Deploy Everything To GitHub Pages
1. Stage the updated assets:
   ```bash
   git add docs/demo/steps.json docs/demo/app.js docs/demo/index.html docs/demo/style.css
   ```
2. Commit and push:
   ```bash
   git commit -m "Refresh SSML demo"
   git push origin main
   ```
3. Ensure GitHub Pages is still set to `main` / `docs`.
4. Wait for the `pages-build-deployment` workflow to succeed.
5. Share the URL: `https://<you>.github.io/study-material/demo/`.

## 6. Demo Talking Points (Use During Interviews)
1. **“Here’s the SSML.”** Paste or type a snippet, underline the tricky parts (breaks, prosody, emphasis).
2. **“Preview Steps.”** Click the button, show the JSON, point out how attributes were normalized.
3. **“Speak It.”** Mention that Web Speech API in the browser respects the parsed data (with limitations).
4. **“Under the hood.”** Highlight that the UI is powered by the same tokenizer/parser/transformer you’ll use in the assignment.
5. **“Deploy story.”** Explain the build command, Pages deploy, and how reviewers can run their own SSML through the demo locally using the Express gateway.

## 7. Stretch Ideas To Wow Them Further
- Draw a timeline of breaks with CSS bars sized by `breakMs`.
- Add a “Download JSON” button that serves `steps.json`.
- Include a mini log panel that captures `SsmlError` messages in red.
- Record a 60-second Loom walkthrough and link it in your README.

The purpose isn’t to build a full production player—it’s to prove you can connect raw SSML, your parsing pipeline, and a polished user experience. That narrative is interview gold.
