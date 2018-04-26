import React from 'react'
import './Board.css'
import {connect} from 'react-redux'

const renderCel = (makeMove, rowIndex, cellIndex, player1or2, hasTurn) => {
  return (
    <button
    className="board-tile"
    disabled={hasTurn}
    onClick={() => makeMove(rowIndex, cellIndex)}
    key={`${rowIndex}-${cellIndex}`}
  >{'-'}</button>
  )
}


const partBoardToShow = (moves) => {


  if (moves <= 1) {return 0}
  else if (moves <= 3){return 1}
  else if (moves <= 5){return 2}
  else if (moves <= 7){return 3}
  else if (moves <= 9){return 4}
  else if (moves <= 11){return 5}
  else if (moves <= 13){return 6}
  else if (moves <= 15){return 7}
  else if (moves <= 17){return 8}
  else if (moves <= 19){return 9}
  else if (moves <= 20){return 0}
}



export default ({board, makeMove, moves}) =>
board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((player1or2, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,player1or2,false))}
  </div>
)[partBoardToShow(moves)]
