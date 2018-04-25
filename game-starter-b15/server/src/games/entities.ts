import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'


export type Player1or2 = 1 | 2
export type Row = [Symbol | null, Symbol | null]
export type Board = [Row, Row, Row, Row, Row, Row, Row, Row, Row, Row]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow ]


@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', { default: emptyBoard })
  board: Board

  @Column('integer', { default: 0, nullable: true })
  turn: number

  @Column('char', {length:1, nullable: true})
  winner: Symbol | null

  @Column('text', { default: 'pending' })
  status: Status

  @Column('integer', { default: 0, nullable: true })
  moves: number

  @Column('integer', { default: 0, nullable: true })
  scoreP1: number

  @Column('integer', { default: 0, nullable: true })
  scoreP2: number

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]
}

@Entity()
  @Index(['game', 'user', 'player1or2'], { unique: true })
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('integer', { default: 0, nullable: true })
  player1or2: Player1or2
}