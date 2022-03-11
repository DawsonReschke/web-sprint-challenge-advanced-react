import React, { useState } from 'react'
import {renderGrid,postUserData,get1Based2DIndex,isAvailableMove} from './helperFunctions'

const useGridState = (def) =>{
  const [grid,setGrid] = useState(def); 

  const setAvailableGrid = (direction) =>{
    if(isAvailableMove(grid,direction)){
      setGrid(grid+direction)
      return true
    }
    return false
  }

  const resetGrid = () => {
    setGrid(def)
  }

  return [grid,setAvailableGrid,resetGrid]
}



export default function AppFunctional(props) {
  const [grid, setGrid,resetGrid] = useGridState(4)
  const [moveCount,setMoveCount] = useState(0); 
  const [message, setMessage] = useState('')
  const [emailInput,setEmailInput] = useState(''); 
  const moveActiveSquare = (direction) =>{
    const directions = [-1,-3,1,3]
    const moveMessages = ["You can't go left","You can't go up","You can't go right","You can't go down"]
    if(!setGrid(directions[direction])){
      setMessage(moveMessages[direction])
    }else{
      setMoveCount(moveCount+1)
    }
    // setGrid(direction) && setMoveCount(moveCount+1)
  }

  const restart = () =>{
    setMessage('')
    setEmailInput('')
  }

  const getStateValue = () => {
    return {
      grid,
      emailInput,
      moveCount
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({get1Based2DIndex(grid).join(',')})</h3>
        <h3 id="steps">You moved {moveCount === 1 ? "1 time" : `${moveCount} times`}</h3>
      </div>
      <div id="grid">
        {renderGrid(grid)}
      </div>
      <div className="info">
        <h3 id="message">{message && message}</h3>
      </div>
      <div id="keypad">
        <button onClick={()=>moveActiveSquare(0)} id="left">LEFT</button>
        <button onClick={()=>moveActiveSquare(1)} id="up">UP</button>
        <button onClick={()=>moveActiveSquare(2)} id="right">RIGHT</button>
        <button onClick={()=>moveActiveSquare(3)} id="down">DOWN</button>
        <button onClick={()=>{restart();resetGrid();setMoveCount(0)}} id="reset">reset</button>
      </div>
      <form>
        <input onChange={(evt)=>{setEmailInput(evt.target.value)}} value={emailInput} id="email" type="email" placeholder="type email"></input>
        <input onClick={(evt)=>{postUserData(evt,getStateValue(),setMessage);restart()}} id="submit" type="submit"></input>
      </form>
    </div>
  )
}
