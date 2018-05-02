import React from 'react'
import ReactDOM from 'react-dom'
import MetronomeKeyboardHandler from './MetronomeKeyboardHandler'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MetronomeKeyboardHandler />, div)
  ReactDOM.unmountComponentAtNode(div)
})
