import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Row } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = ['x', 'o', null]
    return board.length === 10 &&
      board.every(row =>
        row.length === 2 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

export const isValidTransition = (playerSymbol: Symbol, from: Board, to: Board) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol,
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a, b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return changes.length === 1 &&
    changes[0].to === playerSymbol &&
    changes[0].from === null
}

export const calculateWinner = (board: Board): Symbol | null =>
  board
    .concat(
      // vertical winner
      [0, 1,].map(n => board.map(row => row[n])) as Row[]
    )
    .concat(
      [
        // diagonal winner ltr
        [0, 1,].map(n => board[n][n]),
        // diagonal winner rtl
        [0, 1,].map(n => board[2 - n][n])
      ] as Row[]
    )
    .filter(row => row[0] && row.every(symbol => symbol === row[0]))
    .map(row => row[0])[0] || null

export const finished = (board: Board): boolean =>
  board
    .reduce((a, b) => a.concat(b) as Row)
    .every(symbol => symbol !== null)

export const goalScored = (board, moves) => {
  if (moves === 2 && board[1].includes(null)) { return true }
  else if (moves === 4 && board[2].includes(null)) { return true }
  else if (moves === 6 && board[3].includes(null)) { return true }
  else if (moves === 8 && board[4].includes(null)) { return true }
  else if (moves === 10 && board[5].includes(null)) { return true }
  else if (moves === 12 && board[6].includes(null)) { return true }
  else if (moves === 14 && board[7].includes(null)) { return true }
  else if (moves === 16 && board[8].includes(null)) { return true }
  else if (moves === 18 && board[9].includes(null)) { return true }
  else if (moves === 20 && board[10].includes(null)) { return true }

}

const isGoalScored = (row) => {
  if(row.includes(null) === true) return 0
  else return 1
}

export const calculateMove = (board) => {
  let moveCounter = 0
  board.map( (row, index) => {
    if(row.includes('o')) moveCounter = (index + 1) * 2
    else if (row.includes('x')) moveCounter = ((index + 1) * 2) - 1
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