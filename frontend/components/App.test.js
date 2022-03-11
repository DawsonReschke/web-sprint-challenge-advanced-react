import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import App from "./AppFunctional"
import { wait } from '@testing-library/user-event/dist/utils';
// Write your tests here

const left   = ()=> screen.getByText('LEFT')
const up     = ()=> screen.getByText('UP')
const right  = ()=> screen.getByText('RIGHT')
const down   = ()=> screen.getByText('DOWN')
const reset  = ()=> screen.getByText('reset')
const submit = ()=> document.querySelector('#submit')
const emailInput = ()=> screen.getByPlaceholderText('type email')

beforeEach(()=>{
  render(<App/>)
})

test('sanity', () => {

  expect(true).toBe(true)
})

describe('Constant text shows up in the dom',()=>{
  expect(screen.queryByText('Welcome to the GRID'))
  expect(screen.queryByText('Functional'))
  expect(screen.queryByText('Class-Based'))
  expect(screen.queryByText('Bloom Institute of Technology 2022'))
})

describe('Grid operates as expected',()=>{
  test('Counter works properly',()=>{
    expect(screen.queryByText('You moved 0 times')).toBeInTheDocument()
    userEvent.click(left())
    userEvent.click(up())
    userEvent.click(right())
    userEvent.click(down())
    expect(screen.queryByText('You moved 4 times')).toBeInTheDocument()
  })
  test('Coordinate works properly',()=>{
    expect(screen.queryByText('Coordinates (2,2)')).toBeInTheDocument()
    userEvent.click(down())
    userEvent.click(left())
    expect(screen.queryByText('Coordinates (1,3)')).toBeInTheDocument()
  })
  test('The grid does not extend past (3,3) ',()=>{
    userEvent.click(down())
    userEvent.click(down())
    userEvent.click(right())
    userEvent.click(right ())
    expect(screen.queryByText('Coordinates (3,3)')).toBeInTheDocument()
  })
  test('Reset button works properly',()=>{
    userEvent.click(down())
    userEvent.click(right())
    userEvent.click(reset())  
    expect(screen.queryByText('Coordinates (2,2)')).toBeInTheDocument()
    expect(screen.queryByText('You moved 0 times')).toBeInTheDocument()
  })
})

describe('Email form works properly',()=>{
  test('Invalid Email error message shows up',()=>{
    userEvent.type(emailInput(),"random stuff")
    expect(screen.findByText('Ouch: email must be a valid email'))
  })
  test('Email is required error message shows up',()=>{
    userEvent.click(submit())
    expect(screen.findByText('Ouch: email is required'))
  })
  test('Email is reset when you submit a valid email',()=>{
    userEvent.type(emailInput(),"dawsonreschke@gmail.com")
    expect(emailInput()).toHaveValue('dawsonreschke@gmail.com')
    userEvent.click(reset())
    expect(emailInput()).toHaveValue('')
  })
})
