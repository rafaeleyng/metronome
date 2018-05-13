import React from 'react'
import ReactDOM from 'react-dom'
import BlockSlider from './BlockSlider'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BlockSlider />, div)
  ReactDOM.unmountComponentAtNode(div)
})
