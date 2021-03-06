import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board } from './entities'
import { IsBoard, isValidTransition, calculateWinner, finished, calculateScore, calculateMove, isGoalScored, updateCelebrate } from './logic'
import { Validate } from 'class-validator'
import { io } from '../index'

class GameUpdate {

  @Validate(IsBoard, {
    message: 'Not a valid board'
  })
  board: Board
}

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    await Player.create({
      game: entity,
      user,
      player1or2: 1,
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game,
      user,
      player1or2: 2
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: GameUpdate
  ) {
    console.log('made it here!1')
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)
    
    console.log('made it here2')

    const player = await Player.findOne({ user, game })

    //console.log('made it here3', player.player1or2, game.turn)

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    if (player.player1or2 !== game.turn) throw new BadRequestError(`It's not your turn`)
    /*if (!isValidTransition(player.player1or2, game.board, update.board)) {
      throw new BadRequestError(`Invalid move`)
     }*/

    game.scoreP1 = calculateScore(update.board).scoreP1
    game.scoreP2 = calculateScore(update.board).scoreP2
      
    const winner = calculateWinner(game.scoreP1, game.scoreP2)

    if (finished(update.board)) {
      game.status = 'finished'
      game.winner = winner
    }
    else if (game.moves%2 === 0){
      if(game.turn === 1) game.turn = 2
      else game.turn = 1
    }
    
    /*(!(game.moves%2 === 0)) {
      game.turn = player.player1or2 === 1 ? 2 : 1
    }*/
      
    game.board = update.board
    game.moves = calculateMove(update.board)

    game.celebrate = updateCelebrate(update.board, game.moves)

    await game.save()

    console.log('3')

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}
