import React from 'react'
import ReactDOM from 'react-dom'
import BarsGroup from './BarsGroup'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BarsGroup />, div)
  ReactDOM.unmountComponentAtNode(div)
})
