# Quiz App

A small client-side quiz application that lets users choose a question category (Sports, Mathematics, Programming) and take a multiple-choice quiz loaded from local JSON files.

## What this is
A single-page static quiz app built with HTML, CSS and vanilla JavaScript. It demonstrates category selection, dynamic question rendering from JSON files, immediate feedback for answers, and a final score display. It's intended for learners, instructors, or anyone who wants a lightweight quiz demo they can run locally or extend.

### Stack
- **Languages:** JavaScript, CSS, HTML  
- **Runtime:** Browser (no backend)  
- **Notable pattern:** Fetch API to load local JSON question sets (programming.json, mathematics.json, sports.json)

## Features
- Choose a category before starting the quiz
- Questions and answers are loaded from JSON files
- Immediate visual feedback for correct/incorrect answers
- Score tally and final screen with option to play again

## Project structure
```
README.md                 # (this file)
index.html                # App HTML
style.css                 # App styling
script.js                 # Main app logic
sports.json               # Sports questions
mathematics.json          # Mathematics questions
programming.json          # Programming questions
.gitignore
```

How it fits together:
- `index.html` provides the UI shell and category buttons. When a category button is clicked, `script.js` fetches the matching JSON file and populates an internal `questions` array.
- `script.js` controls quiz flow: `startQuiz`, `showQuestions`, `selectAnswer`, `showScore`. Answer buttons are created dynamically and styled via `style.css`.
- The JSON files follow a simple schema: an array of objects `{ question: string, answers: [{ text: string, correct: boolean }, ...] }`.

## How to clone and run locally

1. Clone the repository:
```bash
git clone https://github.com/Fondjo-Styve/QuizApp.git
cd QuizApp
```

2. Quick-open (may fail due to Fetch + file:// restrictions):
- Open `index.html` directly in your browser.

3. Recommended — serve with a simple local HTTP server (avoids fetch/CORS issues):

- With Python 3 (from the project directory):
```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

- With Node (http-server):
```bash
npx http-server -c-1 .
# then open the printed URL (usually http://127.0.0.1:8080)
```

- With VS Code Live Server extension: right-click `index.html` → "Open with Live Server".

Tip: If you'd like an npm script to run a local server, add a simple `package.json` and a script:
```json
{
  "scripts": {
    "start": "npx http-server -c-1 ."
  }
}
```
Then run:
```bash
npm install    # (optional, for other deps)
npm run start
```

## JSON question file format
Each category file is a JSON array. Example item:
```json
{
  "question": "What is a Promise used for in JavaScript?",
  "answers": [
    { "text": "Handling asynchronous operations", "correct": true },
    { "text": "Storing constant variables", "correct": false },
    { "text": "Creating mathematical loops", "correct": false },
    { "text": "Styling HTML elements", "correct": false }
  ]
}
```
To add a new category:
1. Create `yourcategory.json` using the schema above.
2. Add a button with the exact category name to the `#category-buttons` div in `index.html` (the app uses the button text to fetch `yourcategory.json` — matching is case-insensitive but filename must match when lowercased).

## Developer notes / code overview
- Entry points:
  - `index.html` — UI and category buttons
  - `script.js` — main quiz logic
  - `style.css` — styling
- Important functions:
  - `startQuiz()` — resets counters and shows the first question
  - `showQuestions()` — renders the current question and answer buttons
  - `selectAnswer(e)` — handles selection, marks correct/incorrect, disables choices, shows Next
  - `showScore()` — displays final score and offers to reload

## Troubleshooting
- "Could not find <category>.json": ensure the JSON filename exactly matches the button text (case-insensitive) and is in the project root.
- If fetch fails when opening index.html directly, run a local HTTP server as shown above.
- Use the browser console (F12) to inspect runtime errors.

## Accessibility & suggested improvements
Immediate actionable improvements:
- Add ARIA roles and attributes (e.g., role="button", aria-pressed, aria-live) and ensure answer buttons are keyboard-accessible (`tabindex="0"`, respond to Enter/Space).
- Add an `aria-live` region for question and score updates so screen readers announce changes.
- Add visible focus outlines for keyboard users.
Further suggestions:
- Persist high scores in `localStorage`.
- Shuffle questions and answers for replayability.
- Add per-question explanations that show after answering.
- Add unit tests (extract logic into testable functions and use Jest or similar).

## Testing
- No automated tests included. Manual test: run app, select categories, answer questions and verify score flow.
- To unit-test logic: refactor `script.js` to export pure functions for question navigation and scoring, then run tests with Jest.

## GitHub Pages and publishing
Option 1 — publish from `main` branch:
- In repo Settings → Pages, choose branch `main` and folder `/ (root)` or `/docs` to publish.
- If publishing from `main` root, ensure static files are in the root or in `/docs`.

Option 2 — use `gh-pages` branch (npm `gh-pages`):
1. Install `gh-pages` dev dependency:
```bash
npm install --save-dev gh-pages
```
2. Add scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build || echo 'no build step'",
    "deploy": "gh-pages -d ."
  }
}
```
3. Run:
```bash
npm run deploy
```
(For this static site there is no build step — `gh-pages` will publish the repository root or a `/docs` directory.)

## Contribution
Contributions are welcome. Suggested workflow:
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-change`
3. Make changes, add tests if applicable
4. Open a pull request describing the change

If adding categories, include example JSON and add the UI button (or adopt a dynamic category discovery approach).

## License
No license file is included. If you want to make the project open-source, add a LICENSE file (MIT or Apache-2.0 are common choices).

## Contact / Maintainer
Maintainer: Fondjo-Styve

---

Actions I can take for you (pick one):
- Commit this README.md directly to the repository's default branch (direct commit).
- Open a pull request with this README (create branch + PR).
- Make the accessibility improvements (I can edit `index.html` and `script.js` to add ARIA attributes and keyboard support).
- Add an npm `start` script and example `package.json` or add `gh-pages` deployment files and instructions.
- Create a small GitHub Pages setup (e.g., move files into `/docs` and enable Pages via a PR).

Tell me which action you want and I'll perform it (or make further edits here first).
