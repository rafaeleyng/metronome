import React from 'react'
import ReactDOM from 'react-dom'
import InlineSlider from './InlineSlider'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<InlineSlider />, div)
  ReactDOM.unmountComponentAtNode(div)
})
