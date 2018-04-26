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

/*export const isValidTransition = (playerSymbol , from: Board, to: Board) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol,
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a, b) => a.concat(b))
    .filter(change => change.from !== change.to)
  return changes.length === 1}*/

export const calculateWinner = (score1, score2) => {
  if( score1 > score2) return 1
  if (score1 < score2) return 2
  return 0
}

export const finished = (board: Board): boolean =>
  (board[9].includes(1))

export const isGoalScored = (row, index) => {
  const lookFor = (index%2)+1
  let goal = 0
  if( row.includes(lookFor) ) goal = 1
  return goal
}

export const calculateMove = (board) => {
  let moveCounter = 0
  board.map( (row, index) => {
    if(row.includes( 2-(index%2) )) moveCounter = (index + 1) * 2
    else if (row.includes( (index % 2) +1 )){
      moveCounter = ((index + 1) * 2) - 1
    }
    //console.log(row, 2 - (index % 2), index, moveCounter)
  })
  return moveCounter
}

export const calculateScore = (board) => {
  const moves = calculateMove(board)
  let score = new Array()
  score[0] = 0
  score[1] = 0
  board.map( (row, index) => {
    if (index <= (moves / 2) - 1) score[(index) % 2] += isGoalScored(row, index)
  })
    return { scoreP1: score[0], scoreP2: score[1] }
}

export const updateCelebrate = (board, moves) => {
  let celebrate = "WIP"
  console.log(moves)
  if( moves === 0) celebrate = "WIP"
  if( moves % 2 === 0){
    const indexToCheck = (moves - 1)/2
    console.log(indexToCheck, board[indexToCheck], isGoalScored(board[indexToCheck], indexToCheck))
    if (isGoalScored(board[indexToCheck], indexToCheck)) celebrate = "goal"
    else celebrate = "save"
  }
  else celebrate = "WIP"
  return celebrate
}
