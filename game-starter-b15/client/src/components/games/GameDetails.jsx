import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'
import Striker from './Striker'
import GoalOrSave from './GoalOrSave'
class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (toRow, toCell) => {
    const {game, updateGame} = this.props

    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.turn
        else return cell
      })
    )
    updateGame(game.id, board)
  }







  render() {
    const {game, users, authenticated, userId, celebrate} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    const winnerNumber = Number(game.winner)

    console.log("line59",winnerNumber)


    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>
      <p>Player 1 score: {game.scoreP1}</p>
      <p>Player 2 score: {game.scoreP2}</p>

      {
        game.status === 'started' &&
        player && player.player1or2 === game.turn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
       winnerNumber !== 0 &&
       winnerNumber === player.player1or2 &&
       <p>You win</p>
     }
     {
       winnerNumber !== 0 &&
       winnerNumber !== player.player1or2 &&
       <p>You loose</p>
     }

      <hr />

      {
        game.status !== 'pending' &&
        //celebrate === "asd" &&
        <Board board={game.board} makeMove={this.makeMove} moves={game.moves}/>
      }

      <GoalOrSave celeberate={celebrate} status={game.status}/ >
      <Striker moves={game.moves}/ >
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users,
  celeberate: state.celebrate
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
