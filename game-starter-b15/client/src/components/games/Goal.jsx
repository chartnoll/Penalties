import React, {PureComponent} from 'react'
import Goal from './images/Goal.jpeg'
import Save from './images/Save.jpeg'

export default class Goal extends PureComponent {

  render(){
    const celebrate = this.props
    console.log(celebrate)
    if(celebrate === "Goal"){
      return(
        <div>
          <img src={Goal} height='400' /> &&
          <p>GOOOAAAAALLLLLLL!!!!!</p>
        </div>
      )
    }
  }
}
