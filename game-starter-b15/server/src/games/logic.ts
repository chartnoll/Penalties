import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Row, Player1or2 } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 1, 2, null ]
    return board.length == 10 &&
      board.every(row =>
        row.length === 2 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

export const isValidTransition = (playerSymbol , from: Board, to: Board) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol,
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a, b) => a.concat(b))
    .filter(change => change.from !== change.to)
  return changes.length === 1}

export const calculateWinner = (board: Board): Player1or2 | null => {if(board.filter(function(element){element === null}).length >= 3)
{return 1}
else {return 2}
}

export const finished = (board: Board): boolean =>
  (board[9].includes(1))

const isGoalScored = (row) => {
  if(row.includes(null) === true) return 0
  else return 1
}

export const calculateMove = (board) => {
  let moveCounter = 0
  board.map( (row, index) => {
    if(row.includes(2)) moveCounter = (index + 1) * 2
    else if (row.includes(1)) moveCounter = ((index + 1) * 2) - 1
    console.log(row, index, moveCounter)
  })
  return moveCounter
}

export const calculateScore = (board) => {
  const moves = calculateMove(board)
  let score = new Array()
  score[0] = 0
  score[1] = 0
  board.map( (row, index) => {
    //console.log(index, moves, score[0], score[1], (index) % 2, isGoalScored(row))
    if(index <= moves/2) score[(index)%2] += isGoalScored(row)
  })
  return { scoreP1: score[0], scoreP2: score[1] }
}
