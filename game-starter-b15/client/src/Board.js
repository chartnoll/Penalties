import React,{Component} from 'react'
import { connect } from 'react-redux'
import {wordToGuess} from '../reducers/wordAsDisplayed'
import './Board.css';
import pic1 from '../1.png';
import pic2 from '../2.png';
import pic3 from '../3.png';
import pic4 from '../4.png';
import pic5 from '../5.png';
import pic6 from '../6.png';
import pic7 from '../7.png';
import pic8 from '../8.png';
import Image from './Image'




class Board extends Component {
  constructor(props) {
     super(props);
     this.state = {value: ''};

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     // this.showImage = this.showImage.bind(this)
   }
   // showImage(){return 'pic'+this.props.guessesleft}
   guessedLetter(letter){

     this.props.dispatch({type:"TAKE_GUESS", payload: this.state.value})
   }

   handleChange(event) {
       this.setState({value: event.target.value});
     }

     handleSubmit(event) {
       event.preventDefault()// this.decrementGuessesLeft()
       this.guessedLetter(this.state.value)
       event.preventDefault();

     }
     gameboard(){return <div className="Board" >
     <Image/>

     <h2 className='Left'>Total guesses 6</h2>
     <h2 className='Left'>Guesses left {this.props.guessesleft}</h2>
     <h2 className='Center'>Word to Guess</h2>
     <h1 className='Center'>{this.props.wordAsDisplayed.map(function(letter){return letter +" "})}</h1>
     <form className='Center' onSubmit={this.handleSubmit}>
         <label>
           <h2>Pick a letter:</h2>
           <div className='custom-select' >
            <div className='Button'  value={this.state.value} onChange={this.handleChange}>
             <button value="a">A</button>
             <button value="b">B</button>
             <button value="c">C</button>
             <button value="d">D</button>
             <button value="e">E</button>
             <button value="f">F</button>
             <button value="g">G</button>
             <button value="h">H</button>
             <button value="i">I</button>
             <button value="j">J</button>
             <button value="k">K</button>
             <button value="l">L</button>
             <button value="m">M</button>
             <button value="n">N</button>
             <button value="o">O</button>
             <button value="p">P</button>
             <button value="q">Q</button>
             <button value="r">R</button>
             <button value="s">S</button>
             <button value="t">T</button>
             <button value="u">U</button>
             <button value="v">V</button>
             <button value="w">W</button>
             <button value="x">X</button>
             <button value="y">Y</button>
             <button value="z">Z</button>


           </div>
           </div>
         </label>
         <input type="submit" value="Submit" />
       </form>

     </div>
 }

     checkifLose(){if (this.props.guessesleft === 0){return true}
     else {false}
   }
     checkIfWin(){
       console.log(this.props.wordAsDisplayed)
       console.log(wordToGuess)
       if (!(this.props.wordAsDisplayed.includes('_'))){return true;
       console.log('you win!') }
       else {return false}}



  render(){ if (this.checkIfWin()){return <h1 className='Big'> you won!</h1>}
  else if (this.checkifLose()){return <h1 className='Big'> you lost!</h1>}
  else {return this.gameboard()}

  }
}
// src/containers/Board.js

// At the bottom of the file, where you connect your component:
const mapStateToProps = (reduxState) => {
  // return an object with the prop names (keys) and prop values
  // taken from the reduxState (values)
  return {
    guessesleft: reduxState.guessesleft,
    wordAsDisplayed: reduxState.wordAsDisplayed
  }
}

// Then pass it to connect:
export default connect(mapStateToProps)(Board)
