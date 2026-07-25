export type TileState = 'green' | 'yellow' | 'gray'

export function evaluateGuess(
    guess: string,
    answer: string,
): TileState[] {
    const normalizedGuess = guess.toLowerCase()
    const normalizedAnswer = answer.toLowerCase()

    if (normalizedGuess.length !== 5 || normalizedAnswer.length !== 5) {
        throw new Error('Guess and answer must contain exactly five letters.')
    }

    const result: TileState[] = Array(5).fill('gray')
    const remainingLetters = normalizedAnswer.split('')

    // First pass: find green letters.
    for (let index = 0; index < 5; index += 1) {
        if (normalizedGuess[index] === normalizedAnswer[index]) {
            result[index] = 'green'
            remainingLetters[index] = ''
        }
    }

    // Second pass: find yellow letters from unused answer letters.
    for (let index = 0; index < 5; index += 1) {
        if (result[index] === 'green') continue

        const matchingIndex = remainingLetters.indexOf(normalizedGuess[index])

        if (matchingIndex !== -1) {
            result[index] = 'yellow'
            remainingLetters[matchingIndex] = ''
        }
    }

    return result
}