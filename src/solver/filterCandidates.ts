import {
    evaluateGuess,
    type TileState,
} from './evaluateGuess'

export interface SubmittedGuess {
    word: string
    feedback: TileState[]
}

export function filterCandidates(
    candidates: string[],
    guesses: SubmittedGuess[],
): string[] {
    return candidates.filter((candidate) =>
        guesses.every((guess) => {
            const simulatedFeedback = evaluateGuess(
                guess.word,
                candidate,
            )

            return simulatedFeedback.every(
                (state, index) => state === guess.feedback[index],
            )
        }),
    )
}