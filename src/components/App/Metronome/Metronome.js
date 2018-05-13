import React, { Component } from 'react'

import Beats from '../common/Beats'
import TogglePlay from '../common/TogglePlay'
import BeatsSlider from './BeatsSlider'
import MetronomeKeyboardHandler from './MetronomeKeyboardHandler'
import TempoSlider from './TempoSlider'

import RepeatSingleBarStrategy from '../../../metronome/barExecutionStrategies/RepeatSingleBarStrategy'

import startMetronome from '../../../metronome/startMetronome'

class Metronome extends Component {
  state = {
    currentBeat: null,
    isPlaying: false,
    beats: 4,
    tempo: 120,
    stopMetronome: null,
  }

  componentWillUnmount() {
    if (this.state.isPlaying) {
      this.stopMetronome()
    }
  }

  startMetronome() {
    const { beats, tempo } = this.state
    const barExecutionStrategy = new RepeatSingleBarStrategy({ beats, tempo })
    this.setState({
      stopMetronome: startMetronome({
        barExecutionStrategy,
        onBeat: this.handleBeat,
      }),
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
        <TogglePlay isPlaying={isPlaying} onClick={this.handleTogglePlay} />
        <Beats beats={beats} current={currentBeat} />
        <BeatsSlider onChange={this.handleBeatsChange} value={beats} />
        <TempoSlider onChange={this.handleTempoChange} value={tempo} />
      </div>
    )
  }
}

export default Metronome
