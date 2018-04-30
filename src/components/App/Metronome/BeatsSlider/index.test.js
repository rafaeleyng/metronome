import React from 'react'
import ReactDOM from 'react-dom'
import BeatsSlider from './BeatsSlider'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BeatsSlider />, div)
  ReactDOM.unmountComponentAtNode(div)
})
