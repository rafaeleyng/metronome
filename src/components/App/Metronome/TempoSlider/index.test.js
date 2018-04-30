import React from 'react'
import ReactDOM from 'react-dom'
import TempoSlider from './TempoSlider'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TempoSlider />, div)
  ReactDOM.unmountComponentAtNode(div)
})
