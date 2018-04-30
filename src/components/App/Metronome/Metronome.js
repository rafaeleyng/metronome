import React, { Component } from 'react'

import Beats from './Beats'
import BeatsSlider from './BeatsSlider'
import TempoSlider from './TempoSlider'
import TogglePlay from './TogglePlay'

import metronomeFactory from '../../../metronome/metronomeFactory'

class Metronome extends Component {
  state = {
    currentBeatIndex: null,
    isPlaying: false,
    beats: 4,
    tempo: 120,
  }

  componentDidMount() {
    const { beats, tempo } = this.state

    const options = {
      beats,
      tempo,
    }

    this.setState({
      metronome: metronomeFactory(this.handleMetronomeTick, options),
    })
  }

  handleMetronomeTick = ({ beatIndex }) => {
    this.setState({ currentBeatIndex: beatIndex })
  }

  handleBeatsChange = (e) => {
    const beats = parseInt(e.target.value, 10)
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

  handleTempoChange = (e) => {
    const tempo = parseInt(e.target.value, 10)
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
      <div className='Metronome'>
        <div>
          <TogglePlay isPlaying={isPlaying} onClick={this.handleTogglePlay} />
        </div>
        <div>
          <Beats beats={parseInt(beats, 10)} current={currentBeatIndex} />
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
