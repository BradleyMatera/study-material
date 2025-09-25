# Speechify Assessment Prep

This repo is primed for the assessment dry-runs: notes live under `/notes` (GitHub Pages) and coding practice lives under `/src` + `/tests`.

## Quick Start
- **Install Python 3.11+** and make sure `python3 --version` reports the expected interpreter.
- **Run tests** at any time with `bash tests/run_py.sh` (mirrored in VS Code task `test:py`).
- **Keep notes open** from `/notes/index.md` once published to GitHub Pages for fast navigation.

## Publish Notes to GitHub Pages
1. Create a GitHub repo, add it as `origin`, and push the `main` branch.
2. GitHub → *Settings* → *Pages* → set Source to *Deploy from a branch*.
3. Choose branch `main`, folder `/notes`, then save. The Pages URL is ready after the first build.

## Recommended Daily Plan
- **Day 1:** Repo setup, disable AI tooling, type tokenizer text-path and get comfortable with stack/map helpers.
- **Day 2:** Practice typing attribute parsing and stack-based parser logic end-to-end with validation cases.
- **Day 3:** Implement `to_steps` transforms, run a 90-minute mock session, capture assumptions in the README.
- **Day 4:** Test day checklist only—no new coding. Verify runtime versions, read prompt carefully, ship in small commits.

## Folder Layout
```
notes/    → Markdown notes that publish to GitHub Pages
src/py/   → Python scaffolding you will re-type during the assessment
tests/    → Bash-based smoke tests (no external libraries)
.vscode/  → Workspace settings and tasks (no inline suggestions)
```

Stay disciplined: treat everything under `src/py` as practice scaffolding you will re-type from memory when it counts.
