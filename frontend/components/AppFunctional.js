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
    setGrid(direction) && setMoveCount(moveCount+1)
  }

  const restart = () =>{
    resetGrid() 
    setMoveCount(0)
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
        <h3 id="steps">You moved {moveCount} times</h3>
      </div>
      <div id="grid">
        {renderGrid(grid)}
      </div>
      <div className="info">
        <h3 id="message">{message && message}</h3>
      </div>
      <div id="keypad">
        <button onClick={()=>moveActiveSquare(-1)} id="left">LEFT</button>
        <button onClick={()=>moveActiveSquare(-3)} id="up">UP</button>
        <button onClick={()=>moveActiveSquare(1)} id="right">RIGHT</button>
        <button onClick={()=>moveActiveSquare(3)} id="down">DOWN</button>
        <button onClick={restart} id="reset">reset</button>
      </div>
      <form>
        <input onChange={(evt)=>{setEmailInput(evt.target.value)}} value={emailInput} id="email" type="email" placeholder="type email"></input>
        <input onClick={(evt)=>postUserData(evt,getStateValue(),setMessage)} id="submit" type="submit"></input>
      </form>
    </div>
  )
}
