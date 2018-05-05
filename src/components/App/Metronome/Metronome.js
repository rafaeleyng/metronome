import React, { Component } from 'react'

import Beats from './Beats'
import BeatsSlider from './BeatsSlider'
import MetronomeKeyboardHandler from './MetronomeKeyboardHandler'
import TempoSlider from './TempoSlider'
import TogglePlay from './TogglePlay'

// import metronomeFactory from '../../../metronome/metronomeFactory'
import Metronome from '../../../metronome/Metronome'

class MetronomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state.metronome = new Metronome({
      beats: this.state.beats,
      tempo: this.state.tempo,

      onBeat: this.handleBeat,
    })
  }

  state = {
    currentBeatIndex: null,
    isPlaying: false,
    beats: 4,
    tempo: 120,
    // tempo: 60,
  }

  toggleMetronome = (shouldPlay) => {
    this.setState({
      currentBeatIndex: null,
      isPlaying: shouldPlay,
    }, () => {
      if (shouldPlay) {
        this.state.metronome.play()
      } else {
        this.state.metronome.stop()
      }
    })
  }

  restartMetronome = () => {
    this.toggleMetronome(false)
    this.toggleMetronome(true)
  }

  handleBeat = ({ index }) => {
    this.setState({ currentBeatIndex: index })
  }

  handleBeatsChange = (beats) => {
    this.setState({
      beats,
    }, () => {
      const {
        isPlaying,
        metronome,
      } = this.state

      metronome.setBeats(beats)

      if (isPlaying) {
        this.restartMetronome()
      }
    })
  }

  handleTempoChange = (tempo) => {
    this.setState({
      tempo,
    }, () => this.state.metronome.setTempo(tempo))
  }

  handleTogglePlay = () => {
    const { isPlaying } = this.state
    const shouldPlay = !isPlaying
    this.toggleMetronome(shouldPlay)
  }

  render() {
    const {
      beats,
      currentBeatIndex,
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
          <Beats beats={beats} current={currentBeatIndex} />
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

export default MetronomeComponent
