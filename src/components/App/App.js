import React, { Component } from 'react'

import { MdRepeat, MdQueueMusic } from 'react-icons/lib/md'

import Metronome from './Metronome'
import Score from './Score'

const METRONOME = Symbol('metronome')
const SCORE = Symbol('score')

const selectedIconProps = {
  size: 40,
  color: '#DD8836',
}

const unselectedIconProps = {
  size: 40,
  color: '#919191',
}

class App extends Component {
  state = {
    // mode: METRONOME,
    mode: SCORE,
  }

  modeMetronome = () => {
    this.setState({ mode: METRONOME })
  }

  modeScore = () => {
    this.setState({ mode: SCORE })
  }

  render() {
    const isMetronomeMode = this.state.mode === METRONOME
    const metronomeStyle = isMetronomeMode ? selectedIconProps : unselectedIconProps
    const scoreStyle = isMetronomeMode ? unselectedIconProps : selectedIconProps
    return (
      <div className="App">
        <div className="App__main">
          {isMetronomeMode ? (<Metronome />) : (<Score />)}
        </div>
        <div className="App__tabs">
          <MdRepeat onClick={this.modeMetronome} {...metronomeStyle} />
          <MdQueueMusic onClick={this.modeScore} {...scoreStyle} />
        </div>
      </div>
    )
  }
}

export default App
