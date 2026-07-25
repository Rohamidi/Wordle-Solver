import { useState } from 'react'
import { ANSWERS } from './data/answers'
import {
  filterCandidates,
  type SubmittedGuess,
} from './solver/filterCandidates'
import type { TileState } from './solver/evaluateGuess'
import './App.css'

interface EditableRow {
  word: string
  feedback: TileState[]
}

const TILE_STATES: TileState[] = ['gray', 'yellow', 'green']
const TILE_STATE_LABELS: Record<TileState, string> = {
  gray: 'Not in the word',
  yellow: 'In the word, but in the wrong spot',
  green: 'In the right spot',
}
const RESULT_LIMIT = 30

function createEmptyRow(): EditableRow {
  return {
    word: '',
    feedback: Array<TileState>(5).fill('gray'),
  }
}

function App() {
  const [rows, setRows] = useState<EditableRow[]>(() =>
    Array.from({ length: 6 }, createEmptyRow),
  )
  const [results, setResults] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState('')

  const displayedResults = results.slice(0, RESULT_LIMIT)

  function clearOutcome() {
    setResults([])
    setHasSearched(false)
    setError('')
  }

  function updateWord(rowIndex: number, value: string) {
    const word = value
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 5)

    setRows((currentRows) =>
      currentRows.map((row, index) =>
        index === rowIndex ? { ...row, word } : row,
      ),
    )
    clearOutcome()
  }

  function cycleTileState(rowIndex: number, tileIndex: number) {
    setRows((currentRows) =>
      currentRows.map((row, index) => {
        if (index !== rowIndex) return row

        const feedback = [...row.feedback]
        const currentState = feedback[tileIndex] ?? 'gray'
        const currentIndex = TILE_STATES.indexOf(currentState)
        const nextIndex = (currentIndex + 1) % TILE_STATES.length

        feedback[tileIndex] = TILE_STATES[nextIndex] ?? 'gray'

        return { ...row, feedback }
      }),
    )
    clearOutcome()
  }

  function findWords() {
    const hasPartialRow = rows.some(
      (row) => row.word.length > 0 && row.word.length !== 5,
    )

    if (hasPartialRow) {
      setResults([])
      setHasSearched(false)
      setError('Finish or clear the incomplete guess.')
      return
    }

    const submittedGuesses: SubmittedGuess[] = rows
      .filter((row) => row.word.length === 5)
      .map((row) => ({
        word: row.word.toLowerCase(),
        feedback: [...row.feedback],
      }))

    if (submittedGuesses.length === 0) {
      setResults([])
      setHasSearched(false)
      setError('Enter at least one five-letter guess.')
      return
    }

    setResults(filterCandidates(ANSWERS, submittedGuesses))
    setHasSearched(true)
    setError('')
  }

  function resetSolver() {
    setRows(Array.from({ length: 6 }, createEmptyRow))
    clearOutcome()
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />

      <section className="app-frame">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="brand-name">Wordle Solver</p>
          </div>

          <div className="creator-badge" aria-label="Created by Roham Hamidi">
            <span className="creator-ornament" aria-hidden="true">
              ✦
            </span>
            <span className="creator-copy">
              <small>The mind behind it</small>
              <strong>Roham Hamidi</strong>
            </span>
            <span className="creator-title" aria-hidden="true">
              Creator
            </span>
          </div>
        </header>

        <div className="hero">
          <div className="hero-copy">
            <p className="eyebrow">WORDLE SOLVER</p>
            <h1>Find the word.</h1>
            <p className="instructions">
              Enter each guess, then tap the letters to match the colors you got
              in Wordle.
            </p>
          </div>

          <ol className="quick-guide" aria-label="How to use the solver">
            <li>
              <span>1</span>
              <div>
                <strong>Type a guess</strong>
                <small>Use all five letters</small>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Set the colors</strong>
                <small>Tap each tile to match Wordle</small>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Find words</strong>
                <small>See what still fits</small>
              </div>
            </li>
          </ol>
        </div>

        <form
          className="workspace"
          onSubmit={(event) => {
            event.preventDefault()
            findWords()
          }}
        >
          <section className="solver-panel" aria-labelledby="guesses-title">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">GUESSES</p>
                <h2 id="guesses-title">Your guesses</h2>
              </div>
              <p className="word-count">
                <strong>{ANSWERS.length.toLocaleString()}</strong> words
              </p>
            </div>

            <div className="guess-list">
              {rows.map((row, rowIndex) => (
                <div
                  className={`guess-row${row.word ? ' has-content' : ''}`}
                  key={rowIndex}
                >
                  <div className="guess-meta">
                    <span className="guess-number">{rowIndex + 1}</span>
                    <label htmlFor={`guess-${rowIndex}`}>
                      Guess {rowIndex + 1}
                    </label>
                  </div>

                  <input
                    id={`guess-${rowIndex}`}
                    className="guess-input"
                    value={row.word}
                    onChange={(event) =>
                      updateWord(rowIndex, event.target.value)
                    }
                    placeholder="Type..."
                    maxLength={5}
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    aria-label={`Enter guess ${rowIndex + 1}`}
                  />

                  <div
                    className="tiles"
                    aria-label={`Colors for guess ${rowIndex + 1}`}
                  >
                    {Array.from({ length: 5 }, (_, tileIndex) => {
                      const letter = row.word[tileIndex] ?? ''
                      const state = row.feedback[tileIndex] ?? 'gray'

                      return (
                        <button
                          type="button"
                          key={tileIndex}
                          className={`tile tile-${state}${letter ? '' : ' tile-empty'
                            }`}
                          disabled={!letter}
                          onClick={() =>
                            cycleTileState(rowIndex, tileIndex)
                          }
                          aria-label={
                            letter
                              ? `${letter}: ${TILE_STATE_LABELS[state]}. Click to change the color.`
                              : `Letter ${tileIndex + 1} is empty`
                          }
                          title={
                            letter
                              ? `${TILE_STATE_LABELS[state]} — click to change`
                              : 'Type a letter first'
                          }
                        >
                          {letter}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="legend" aria-label="Tile color meanings">
              <span>
                <i className="legend-gray" aria-hidden="true" />
                Not in word
              </span>
              <span>
                <i className="legend-yellow" aria-hidden="true" />
                Wrong spot
              </span>
              <span>
                <i className="legend-green" aria-hidden="true" />
                Right spot
              </span>
            </div>

            {error && (
              <p className="error-message" role="alert">
                <span aria-hidden="true">!</span>
                {error}
              </p>
            )}

            <div className="actions">
              <button className="find-button" type="submit">
                Find words
                <span aria-hidden="true">→</span>
              </button>
              <button
                className="reset-button"
                type="button"
                onClick={resetSolver}
              >
                Clear
              </button>
            </div>
          </section>

          <aside
            className={`results-panel${hasSearched ? ' has-searched' : ''}`}
            aria-live="polite"
            aria-labelledby="results-title"
          >
            <div className="results-heading">
              <div>
                <p className="panel-kicker">RESULTS</p>
                <h2 id="results-title">Possible words</h2>
              </div>
              {hasSearched && (
                <span className="result-count">{results.length}</span>
              )}
            </div>

            {!hasSearched ? (
              <div className="results-empty">
                <div className="empty-tiles" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <h3>Your results will show here</h3>
                <p>Add a guess and set its tile colors.</p>
              </div>
            ) : results.length > 0 ? (
              <div className="results-content">
                <div className="results-summary">
                  <h3>
                    {results.length === 1
                      ? '1 word matches'
                      : `${results.length.toLocaleString()} words match`}
                  </h3>
                  {results.length > RESULT_LIMIT && (
                    <p>Showing the first {RESULT_LIMIT}</p>
                  )}
                </div>

                <div className="result-words">
                  {displayedResults.map((word, index) => (
                    <span className="result-word" key={word}>
                      <small>{String(index + 1).padStart(2, '0')}</small>
                      {word.toUpperCase()}
                    </span>
                  ))}
                </div>

                {results.length > RESULT_LIMIT && (
                  <p className="more-results">
                    Add another guess to narrow it down.
                  </p>
                )}
              </div>
            ) : (
              <div className="results-empty no-results">
                <div className="no-result-mark" aria-hidden="true">
                  ×
                </div>
                <h3>Nothing matches</h3>
                <p>Check the letters and colors, then try again.</p>
              </div>
            )}
          </aside>
        </form>

        <footer className="site-footer">
          <div className="footer-credit">
            <small>Created by</small>
            <strong>Roham Hamidi</strong>
          </div>

          <div
            className="yasna-dedication"
            aria-label="A special dedication to Yasna"
          >
            <span
              className="dedication-roses dedication-roses-left"
              aria-hidden="true"
            >
              <span>🌹</span>
              <span>❤️</span>
            </span>

            <div className="dedication-copy">
              <small>A heartfelt shout-out</small>
              <strong>For Yasna, the inspiration behind it all</strong>
              <span>
                You introduced me to Wordle and inspired this entire project.
                Without you, I wouldn’t even have discovered the game—let alone
                built this. Thank you for being the spark behind it all. This
                one is for you, with all my love. ♡
              </span>
            </div>

            <span
              className="dedication-roses dedication-roses-right"
              aria-hidden="true"
            >
              <span>❤️</span>
              <span>🌹</span>
            </span>
          </div>
        </footer>
      </section>
    </main>
  )
}

export default App
