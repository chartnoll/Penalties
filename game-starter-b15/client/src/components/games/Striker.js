import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'
import LISA from './images/LISA.png'
import ELZE from './images/ELZE.png'
import ABBAS from './images/ABBAS.png'
import EMELINE from './images/EMELINE.png'
import LAVINIA from './images/LAVINIA.png'
import CHRIS from './images/CHRIS.png'
import DAVID from './images/DAVID.png'
import IRENE from './images/IRENE.png'
import GERSOM from './images/GERSOM.png'
import IOANNA from './images/IOANNA.png'


export default class Striker extends PureComponent {

render(){
const moves = this.props
console.log(moves)
if (moves.moves <= 1) {return(<div><img src={LISA} height='400' /><p>HEY I AM LISA!</p></div>)}
else if (moves.moves <=3) {return(<div><img src={CHRIS} height='400' /><p>HEY I AM CHRIS!</p></div>)}
else if (moves.moves <=5) {return(<div><img src={ABBAS} height='400' /><p>HEY I AM ABBAS!</p></div>)}
else if (moves.moves <=7) {return(<div><img src={DAVID} height='400' /><p>HEY I AM DAVID!</p></div>)}
else if (moves.moves <=9) {return(<div><img src={LAVINIA} height='400' /><p>HEY I AM LAVINIA!</p></div>)}
else if (moves.moves <=11) {return(<div><img src={EMELINE} height='400' /><p>HEY I AM EMELINE!</p></div>)}
else if (moves.moves <=13) {return(<div><img src={IOANNA} height='400' /><p>HEY I AM IOANNA!</p></div>)}
else if (moves.moves <=15) {return(<div><img src={IRENE} height='400' /><p>HEY I AM IRENE!</p></div>)}
else if (moves.moves <=17) {return(<div><img src={GERSOM} height='400' /><p>HEY I AM GERSOM!</p></div>)}
else if (moves.moves <=19) {return(<div><img src={ELZE} height='400' /><p>HEY I AM ELZE!</p></div>)}
else {return(<h1>hello</h1>)}

}
}
