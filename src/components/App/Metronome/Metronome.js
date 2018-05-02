import React, { Component } from 'react'

import Beats from './Beats'
import BeatsSlider from './BeatsSlider'
import MetronomeKeyboardHandler from './MetronomeKeyboardHandler'
import TempoSlider from './TempoSlider'
import TogglePlay from './TogglePlay'

import metronomeFactory from '../../../metronome/metronomeFactory'

class Metronome extends Component {
  constructor(props) {
    super(props)
    this.state.metronome = metronomeFactory(this.handleMetronomeTick, {
      beats: this.state.beats,
      tempo: this.state.tempo,
    })
  }

  state = {
    currentBeatIndex: null,
    isPlaying: false,
    beats: 4,
    tempo: 120,
  }

  handleMetronomeTick = ({ beatIndex }) => {
    this.setState({ currentBeatIndex: beatIndex })
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
        // TODO refatorar esse restart do play
        metronome.togglePlay(false)
        metronome.togglePlay(true)
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
    this.setState({
      currentBeatIndex: null,
      isPlaying: shouldPlay,
    }, () => this.state.metronome.togglePlay(shouldPlay))
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

export default Metronome
