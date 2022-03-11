import React from 'react'
import {renderGrid,postUserData,get1Based2DIndex,isAvailableMove} from './helperFunctions'
const URL = 'http://localhost:9000/api/result'

const initialState = {
  grid:4,
  moveCount:0,
  emailInput:'',
  message:''
}


export default class AppClass extends React.Component {
  state = initialState

  moveActiveSquare = ( direction ) =>{
    const { grid } = this.state
    const directions = [-1,-3,1,3]
    const errorMessages = ["You can't go left","You can't go up","You can't go right","You can't go down"]
    if(!isAvailableMove(grid,directions[direction])){
      this.setMessage(errorMessages[direction])
      return
    } 
    this.setState({
      ...this.state,
      moveCount : this.state.moveCount + 1,
      grid: this.state.grid + directions[direction]
    })
  }
  
  setMessage = (message) =>{
    this.setState({
      ...this.state,
      message:message
    })
  }

  resetGrid = ()=>{
    this.setState({...this.state,grid:4,moveCount:0,emailInput:'',message:''})
    }

  resetEmail = ()=>{
    this.setState({
      ...this.state,
      emailInput:''
    })
  }

  onChange = (evt) =>{
    this.setState({
      ...this.state,
      emailInput:evt.target.value
    })
  }

  render() {
    const { grid , moveCount , message, emailInput} = this.state
    const { className } = this.props
    const [x,y] = get1Based2DIndex(grid)
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x},{y})</h3>
          <h3 id="steps">You moved {moveCount === 1 ? `1 time` : `${moveCount} times`}</h3>
        </div>
        <div id="grid">
          {renderGrid(this.state.grid)}
        </div>
        <div className="info">
          <h3 id="message">{message && message}</h3>
        </div>
        <div id="keypad">
          <button onClick={()=>this.moveActiveSquare(0)} id="left">LEFT</button>
          <button onClick={()=>this.moveActiveSquare(1)} id="up">UP</button>
          <button onClick={()=>this.moveActiveSquare(2)} id="right">RIGHT</button>
          <button onClick={()=>this.moveActiveSquare(3)} id="down">DOWN</button>
          <button onClick={this.resetGrid} id="reset">reset</button>
        </div>
        <form>
          <input onChange={this.onChange} value={emailInput} id="email" type="email" placeholder="type email"></input>
          <input onClick={(evt)=>{postUserData(evt,this.state,this.setMessage);this.resetEmail();}} id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
