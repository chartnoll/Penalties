import React, {PureComponent} from 'react'
//import goalImage from './images/Goal.jpg'
//import saveImage from './images/Save.jpeg'

export default class GoalOrSave extends PureComponent {

  displayGoal = (celebrate, status) =>{
    return celebrate === "goal" && status === "started"
  }

  displaySave = (celebrate, status) =>{
    return celebrate === "save" && status === "started"
  }

  render(){
    const {celebrate, status} = this.props
    console.log(celebrate)

    if(this.displayGoal(celebrate, status)) {
      return <div><p>GOOOAAAAALLLLLLL!!!!!</p></div>
    }
    else if(this.displaySave(celebrate, status)) {
      return <div><p>SSSAAAAVVVEEEEE!!!!!</p></div>
    }
    else return <h1></h1>
  }
}
