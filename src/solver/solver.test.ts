import { describe, expect, it } from 'vitest'
import { evaluateGuess } from './evaluateGuess'
import {
    filterCandidates,
    type SubmittedGuess,
} from './filterCandidates'

describe('evaluateGuess', () => {
    it('marks a correct answer as all green', () => {
        expect(evaluateGuess('crane', 'crane')).toEqual([
            'green',
            'green',
            'green',
            'green',
            'green',
        ])
    })

    it('matches the AMPLE example', () => {
        expect(evaluateGuess('ample', 'amber')).toEqual([
            'green',
            'green',
            'gray',
            'gray',
            'yellow',
        ])
    })

    it('handles repeated letters without over-counting', () => {
        expect(evaluateGuess('allee', 'apple')).toEqual([
            'green',
            'yellow',
            'gray',
            'gray',
            'green',
        ])
    })

    it('rejects words that are not exactly five letters', () => {
        expect(() => evaluateGuess('four', 'apple')).toThrow(
            'Guess and answer must contain exactly five letters.',
        )
    })
})

describe('filterCandidates', () => {
    it('keeps only words matching all submitted feedback', () => {
        const guesses: SubmittedGuess[] = [
            {
                word: 'ample',
                feedback: [
                    'green',
                    'green',
                    'gray',
                    'gray',
                    'yellow',
                ],
            },
        ]

        const candidates = [
            'amber',
            'amend',
            'amble',
            'ample',
            'among',
        ]

        expect(filterCandidates(candidates, guesses)).toEqual([
            'amber',
            'amend',
        ])
    })
})