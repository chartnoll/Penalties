import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Row } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', null ]
    return board.length === 5 &&
      board.every(row =>
        row.length === 2 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

export const findPenaltyNumber = ( to ) => {
  let maximumValue = 0
  to.map((penArray, index) => {if(checkEachPenlty(penArray, index) > maximumValue) maximumValue = checkEachPenlty(penArray, index)})
  if(maximumValue === 0) maximumValue = 1
  return maximumValue
}

const checkEachPenlty = (penArray, index) => {
  return Math.round(penArray.includes("o") / 2 + penArray.includes("x") / 2) * (index + 1)
}


//const checkRestrictedChanges = (penaltyNumber, )