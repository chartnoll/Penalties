
import 'mocha'
import { equal } from 'assert'
import { calculateWinner, isValidTransition, finished, calculateScore, calculateMove, updateCelebrate } from './logic'
import { Board } from './entities'

const board1 = [
  [null, 2],
  [1, 2],
  [2, 1],
  [2, 1],
  [null, 2],
  [2, 1],
  [1, 2],
  [null, null],
  [null, null],
  [null, null]
]

const board2 = [
  [null, 2],
  [1, 2],
  [2, 1],
  [2, 1],
  [null, 2],
  [1, 2],
  [1, 2],
  [null, 1],
  [2, 1],
  [2, null]
]

const board3 = [
  [2, null],
  [2, 1],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null]
]

const board4 = [
  [2, null],
  [2, 1],
  [1, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null]
]

describe('calculateScore()', () => {
  it('Score P1 for board 1 = 2', () => {
    equal(calculateScore(board1).scoreP1, 2)
  })

  it('Score P2 for board 1 = 3', () => {
    equal(calculateScore(board1).scoreP2, 3)
  })

  it('Score P1 for board 2 = 3', () => {
    equal(calculateScore(board2).scoreP1, 3)
  })

  it('Score P2 for board 2 = 3', () => {
    equal(calculateScore(board2).scoreP2, 3)
  })

  it('Score P1 for board 3 = 0', () => {
    equal(calculateScore(board3).scoreP1, 0)
  })

  it('Score P2 for board 2 = 1', () => {
    equal(calculateScore(board3).scoreP2, 1)
  })
})

describe('calculateMove()', () => {

  it('CalculateMove for board1 should equal 14', () => {
    equal(calculateMove(board1), 14)
  })

  it('CalculateMove for board2 should equal 19', () => {
    equal(calculateMove(board2), 19)
  })

  it('CalculateMove for board2 should equal 14', () => {
    equal(calculateMove(board3), 4)
  })

  it('CalculateMove for board4 should equal 5', () => {
    equal(calculateMove(board4), 5)
  })
})

describe('updateCelebrate()', () => {

  it('updateCelebrate for board1 should equal 14', () => {
    equal(updateCelebrate(board1, 14), "goal")
  })
})
