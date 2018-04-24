import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Row } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', null ]
    return board.length == 5 &&
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
    .reduce((a,b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return changes.length === 1}

export const calculateWinner = (board: Board): Symbol | null => {if(board.filter(function(element){element === null}).length >= 3)
{return 'x'}
else {return 'o'}
}

export const finished = (board: Board): boolean =>
  (board[4].includes('o'))

export const goalScored = (board: Board, moves) => {
  if (moves%2 === 0){}
} 