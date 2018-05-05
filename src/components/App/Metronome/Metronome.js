import React, { Component } from 'react'

import Beats from './Beats'
import BeatsSlider from './BeatsSlider'
import MetronomeKeyboardHandler from './MetronomeKeyboardHandler'
import TempoSlider from './TempoSlider'
import TogglePlay from './TogglePlay'

import startMetronome from '../../../metronome/startMetronome'

class Metronome extends Component {
  state = {
    currentBeat: null,
    isPlaying: false,
    beats: 4,
    tempo: 120,
    stopMetronome: null,
  }

  startMetronome() {
    const { beats, tempo } = this.state
    this.setState({
      stopMetronome: startMetronome({ beats, tempo, onBeat: this.handleBeat }),
    })
  }

  stopMetronome() {
    this.state.stopMetronome()
  }

  restartMetronome = () => {
    if (this.state.isPlaying) {
      this.stopMetronome()
      this.startMetronome()
    }
  }

  handleBeat = ({ index }) => {
    this.setState({ currentBeat: index })
  }

  handleBeatsChange = (beats) => {
    this.setState({
      beats,
    }, () => {
      if (this.state.isPlaying) {
        this.restartMetronome()
      }
    })
  }

  handleTempoChange = (tempo) => {
    this.setState({
      tempo,
    }, () => {
      if (this.state.isPlaying) {
        this.restartMetronome()
      }
    })
  }

  handleTogglePlay = () => {
    const shouldPlay = !this.state.isPlaying

    if (shouldPlay) {
      this.startMetronome()
    } else {
      this.stopMetronome()
    }

    this.setState({
      currentBeat: null,
      isPlaying: shouldPlay,
    })
  }

  render() {
    const {
      beats,
      currentBeat,
      isPlaying,
      tempo,
    } = this.state

    return (
      <div className="Metronome">
        <MetronomeKeyboardHandler
          beats={beats}
          tempo={tempo}
          onBeatsChange={this.handleBeatsChange}
          onTempoChange={this.handleTempoChange}
          onTogglePlay={this.handleTogglePlay}
        />
        <div>
          <TogglePlay isPlaying={isPlaying} onClick={this.handleTogglePlay} />
        </div>
        <div>
          <Beats beats={beats} current={currentBeat} />
        </div>
        <div>
          <BeatsSlider onChange={this.handleBeatsChange} value={beats} />
        </div>
        <div>
          <TempoSlider onChange={this.handleTempoChange} value={tempo} />
        </div>
      </div>
    )
  }
}

export default Metronome
