import React from 'react'
import ReactDOM from 'react-dom'
import Beat from './Beat'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Beat />, div)
  ReactDOM.unmountComponentAtNode(div)
})
