import React, { Component } from 'react'

import { MdRepeatOne, MdQueueMusic } from 'react-icons/lib/md'

import Metronome from './Metronome'
import Score from './Score'

import PreferencesService, { PREFERENCE_TYPE_STR } from '../../services/PreferencesService'

const preferencesService = new PreferencesService('app')
const PREFERENCE_MODE = preferencesService.buildPreference('mode', PREFERENCE_TYPE_STR)

const METRONOME = 'metronome'
const SCORE = 'score'

const selectedIconProps = {
  size: 40,
  color: '#DD8836',
}

const unselectedIconProps = {
  size: 40,
  color: '#919191',
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: preferencesService.get(PREFERENCE_MODE) || METRONOME,
    }
  }

  modeMetronome = () => {
    this.setState({ mode: METRONOME })
    preferencesService.set(PREFERENCE_MODE, METRONOME)
  }

  modeScore = () => {
    this.setState({ mode: SCORE })
    preferencesService.set(PREFERENCE_MODE, SCORE)
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
          <MdRepeatOne onClick={this.modeMetronome} {...metronomeStyle} />
          <MdQueueMusic onClick={this.modeScore} {...scoreStyle} />
        </div>
      </div>
    )
  }
}

export default App
