import React, {PureComponent} from 'react'
//import saveImage from './images/Save.jpeg'

export default class Save extends PureComponent {

  render(){
    const celebrate = this.props
    console.log(celebrate)
    if(celebrate === "Save"){
      return(
        <div>
          <img src={Save} height='400' /> &&
          <p>SAAAAVVVVVEEEEEE!!!!!</p>
        </div>
      )
    }
  }
}
