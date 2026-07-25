<div align="center">

# Wordle Solver

### A clean, responsive way to narrow down the next five-letter word.

<br />

<img
  src="https://img.shields.io/badge/CREATED_BY-ROHAM_HAMIDI-D7B46A?style=for-the-badge&labelColor=111827"
  alt="Created by Roham Hamidi"
/>

<br /><br />

<img
  src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white"
  alt="React 19"
/>
<img
  src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white"
  alt="TypeScript 5"
/>
<img
  src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white"
  alt="Vite 8"
/>

</div>

---

## About

Wordle Solver turns the clues from your guesses into a focused list of words that still fit. Enter up to six guesses, set each letter to gray, yellow, or green, and let the solver compare those clues against a dictionary of 14,855 five-letter words.

It is quick to use, handles repeated letters correctly, and feels at home on phones, tablets, and desktops.

## How to use it

1. Enter one of your five-letter guesses.
2. Tap each letter tile until its color matches the result in Wordle.
3. Select **Find words** to see the remaining possibilities.
4. Add another guess whenever you need to narrow the list further.

| Tile | Meaning |
| :---: | --- |
| ⬛ | The letter is not in the word |
| 🟨 | The letter is in the word, but in a different position |
| 🟩 | The letter is in the correct position |

## Highlights

- Searches a pool of **14,855 five-letter words**
- Supports all six Wordle guesses
- Handles repeated letters with Wordle-style matching
- Shows up to 30 possible answers at a time
- Clears outdated results as soon as a guess changes
- Uses clear labels, keyboard focus states, and touch-friendly controls
- Adapts smoothly from small phones to large desktop screens
- Features a custom liquid-glass interface

## Built with

| Technology | Role |
| --- | --- |
| **React** | Interface and state |
| **TypeScript** | Application logic and type safety |
| **Vite** | Development and production builds |
| **CSS** | Responsive layout, animation, and liquid-glass styling |

## Getting started

After downloading or cloning the repository:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

To check and prepare a production build:

```bash
npm run lint
npm run build
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Main interface and user interaction |
| `src/App.css` | Component styling and responsive layouts |
| `src/index.css` | Global styles and visual defaults |
| `src/data/answers.ts` | Five-letter candidate dictionary |
| `src/solver/evaluateGuess.ts` | Wordle-style color evaluation |
| `src/solver/filterCandidates.ts` | Candidate filtering logic |

## How the solver works

For every word in the dictionary, the solver recreates the tile pattern that each submitted guess would produce. A word stays in the results only when all of its patterns match the colors entered by the user.

The evaluation happens in two passes: correct-position letters are matched first, then remaining letters are checked for different positions. This prevents repeated letters from being counted more than once.

## A special thank-you

🌹🤍 A heartfelt thank-you to my girlfriend, **Yasna**. She introduced me to Wordle and inspired me to build this project. Without her, it simply would not exist. 🤍🌹

## Word list

The candidate dictionary is based on [Tab Atkins Jr.'s Wordle word list](https://github.com/tabatkins/wordle-list), which is provided under the MIT License.

## Disclaimer

This is an independent, unofficial Wordle helper. It is not affiliated with or endorsed by The New York Times.

---

<div align="center">

### Roham Hamidi

**Design · Development · Solver Logic**

</div>
