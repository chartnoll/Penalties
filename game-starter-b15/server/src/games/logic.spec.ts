import 'mocha'
import { equal } from 'assert'
//import { calculateWinner, isValidTransition, finished } from './logic'
import { Board } from './entities'
import {findPenaltyNumber} from './logic'

describe('findPenaltyNumber()', () => {

  it('should work give penalty is 1', () => {
    const board: Board = [
      ['x', 'o'],
      ['o', null],
      [null, 'x'],
      [null, null],
      [null, null],
    ]
    equal(findPenaltyNumber(board), 3)
  })

  it('should work give penalty is 1', () => {
    const board: Board = [
      ['x', 'o'],
      ['o', null],
      ['o', 'x'],
      ['o', 'x'],
      [null, null],
    ]
    equal(findPenaltyNumber(board), 4)
  })

  it('should work give penalty is 1', () => {
    const board: Board = [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ]
    equal(findPenaltyNumber(board), 1)
  })
/*
  it('should work give penalty is 1', () => {
    const board: Board = [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ]
    equal(checkRestrictedChanges(board), 1)
  })*/
})



