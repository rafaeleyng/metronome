import React from 'react'
import ReactDOM from 'react-dom'
import Beats from './Beats'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Beats />, div)
  ReactDOM.unmountComponentAtNode(div)
})
