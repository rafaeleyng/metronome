import React from 'react'
import ReactDOM from 'react-dom'
import TogglePlay from './TogglePlay'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TogglePlay />, div)
  ReactDOM.unmountComponentAtNode(div)
})
