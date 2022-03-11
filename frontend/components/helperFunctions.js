import React from "react"
import axios from "axios"
const URL = 'http://localhost:9000/api/result'


const get1Based2DIndex = (activeIndex) => {
    return [(Math.floor(activeIndex % 3)+1),(Math.floor(activeIndex / 3)+1)]
}

const isAvailableMove = (grid,direction) => {
    const lastGridState = get1Based2DIndex(grid)
    const newGridState = get1Based2DIndex(grid+direction)
    // if either the x's or y's are the same  && nether x or y are greater then width+1,height+1
    if((lastGridState[0]===newGridState[0] || lastGridState[1]===newGridState[1]) && 
    (newGridState[0] > 0 && newGridState[0] < 4 ) && 
    (newGridState[1] > 0 && newGridState[1] < 4 )) return true
    return false;
  }

const postUserData = (evt,state,setMessage) => {
  evt.preventDefault()
  axios.post(URL,
    {
      x:get1Based2DIndex(state.grid)[0],
      y:get1Based2DIndex(state.grid)[1],
      email:state.emailInput,
      steps:state.moveCount
    })
      .then(({data})=>{
        setMessage(data.message)
      })
      .catch(({response})=>{
        setMessage(response.data.message)
      })
}


const renderGrid = (activeIndex) =>{
    const squares = []
    for(let i = 0; i < 9; i++){
      squares[i] = i == activeIndex ? 
      (<div key={i} className='square active'>B</div>) : 
      (<div key={i} className='square'/>)
    }  
    return squares
  }

export {renderGrid,postUserData,get1Based2DIndex,isAvailableMove}