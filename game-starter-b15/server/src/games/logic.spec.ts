
import 'mocha'
import { equal } from 'assert'
import { calculateWinner, isValidTransition, finished, goalScored, calculateScore, calculateMove } from './logic'
import { Board } from './entities'

const board1 = [
  [null, 'o'],
  ['x', 'o'],
  ['o', 'x'],
  ['x', 'o'],
  [null, 'o'],
  ['x', 'o'],
  ['x', 'o'],
  [null, null],
  [null, null],
  [null, null]
]

const board2 = [
  [null, 'o'],
  ['x', 'o'],
  ['o', 'x'],
  ['x', 'o'],
  [null, 'o'],
  ['x', 'o'],
  ['x', 'o'],
  [null, 'o'],
  ['x', 'o'],
  [null, null]
]

const board3 = [
  [null, 'o'],
  ['x', 'o'],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null],
  [null, null]
]

describe('goalScored()', () => {

  it('Should calculate a goal scored on move 14', () => {
    const board = [
      [null, 'o'],
      ['x', 'o'],
      ['o', 'x'],
      ['x', 'o'],
      [null, 'o'],
      ['x', 'o'],
      ['x', 'o'],
      [null, null],
      [null, null],
      [null, null]
    ]
    const moves = 14
    equal(goalScored(board, moves), true)
  })
})

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
})

/*

describe('calculateWinner()', () => {

  it('should work for a horizontal winner', () => {
    const board: Board = [
      ['x', 'x', 'o'],
      ['x', 'x', 'x'],
      [null, 'o', 'o'],
    ]
    equal(calculateWinner(board), 'x')
  })

  it('should work for a vertical winner', () => {
    const board: Board = [
      ['o', 'x', 'o'],
      ['x', 'x', 'o'],
      [null, 'o', 'o'],
    ]
    equal(calculateWinner(board), 'o')
  })

  it('should work for a diagonal winner [rtl]', () => {
    const board: Board = [
      ['o', 'x', 'x'],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(calculateWinner(board), 'x')
  })

  it('should work for a diagonal winner [ltr]', () => {
    const board: Board = [
      ['o', null, 'x'],
      [null, 'o', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(calculateWinner(board), 'o')
  })

  it('should work when there is no winner', () => {
    const board: Board = [
      ['o', null, 'x'],
      [null, null, 'o'],
      ['x', 'o', 'o'],
    ]
    equal(calculateWinner(board), null)
  })

  it('should work when the board is empty', () => {
    const board: Board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
    equal(calculateWinner(board), null)
  })
})

describe('isValidTransition()', () => {

  it('should allow for a move from x', () => {
    const from: Board = [
      ['o', null, 'x'],
      [null, null, 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', null, 'x'],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(isValidTransition('x', from, to), true)
  })

  it('should allow for a move from o', () => {
    const from: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', null, 'o'],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(isValidTransition('o', from, to), true)
  })

  it('should not allow to overwrite', () => {
    const from: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'x'],
    ]
    equal(isValidTransition('x', from, to), false)
  })

  it('should not allow to do more than 1 change', () => {
    const from: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', 'x', 'x'],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(isValidTransition('x', from, to), false)
  })

  it('should not allow to do more than 1 change even if 1 is valid', () => {
    const from: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', null, 'o'],
      [null, 'x', 'o'],
      [null, 'o', 'o'],
    ]
    equal(isValidTransition('o', from, to), false)
  })
})

describe('finished()', () => {

  it('should finish when there are no moves left', () => {
    const board: Board = [
      ['o', 'o', 'x'],
      ['x', 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(finished(board), true)
  })

  it('should not finish when there are moves left', () => {
    const board: Board = [
      ['o', null, 'x'],
      [null, null, 'o'],
      ['x', 'o', 'o'],
    ]
    equal(finished(board), false)
  })
})
*/
