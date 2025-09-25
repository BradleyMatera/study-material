# Speechify Assessment Prep (TypeScript)

A GitHub Pages–ready playbook for the Speechify DSA / SSML TypeScript assessment. The notes under `/notes` act as your live tutorial site, while `/src/ts` and `/tests` hold the code scaffolding you will type from memory during practice and on the real assessment.

## Quick Start
- **Install Node.js LTS** and run `npm install` to fetch the local TypeScript compiler.
- **Compile** with `npm run build` (runs `tsc --pretty false` into `dist/`).
- **Run smoke tests** with `npm test` or trigger the VS Code task `test:ts`.
- **Publish notes** by pushing to GitHub and enabling Pages with the `/notes` folder.

## Repository Layout
```
notes/        → Markdown knowledge base (deployed to GitHub Pages)
notes/_config.yml → GitHub Pages theme + metadata
src/ts/       → TypeScript scaffolding for tokenizer/parser/transform
tests/        → Bash-based smoke tests invoking compiled JS
.vscode/      → Workspace settings/tasks/recommendations (AI disabled)
tsconfig.json → TypeScript compiler configuration
package.json  → npm scripts for build/test
```

## Practice Rhythm
1. **Warm-up** with the daily plan in `notes/daily-plan.md`.
2. **Type tokenizer logic** from scratch (classification + attribute parsing).
3. **Build parser + validation** ensuring the stack never drifts.
4. **Transform nodes → utterance steps** and confirm with shell tests.
5. **Document findings** in the README or notes after each session.

## GitHub Pages Deployment
1. Create a GitHub repository and add it as `origin`.
2. Push the `main` branch (`git add . && git commit && git push -u origin main`).
3. GitHub → *Settings* → *Pages* → Source: *Deploy from a branch* → select `main`, folder `/notes`.
4. Wait for the first build to complete, then bookmark the Pages URL for assessment day.

Treat everything in `src/ts` as reference scaffolding only—you will re-type the real solution during the test without copy/paste.
