import React, { Component } from 'react'

import Beats from './Beats'
import BeatsSlider from './BeatsSlider'
import TempoSlider from './TempoSlider'
import TogglePlay from './TogglePlay'

import metronomeFactory from '../../../metronome/metronomeFactory'

import metronomeConfig from '../../../config/metronome'

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

    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e) => {
    const SPACE = 32
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    const { beats, tempo } = this.state

    switch (e.keyCode) {
      case SPACE: {
        this.handleTogglePlay()
        break
      }
      case LEFT: {
        if (tempo > metronomeConfig.tempo.min) {
          this.handleTempoChange(tempo - 1)
        }
        break
      }
      case RIGHT: {
        if (tempo < metronomeConfig.tempo.max) {
          this.handleTempoChange(tempo + 1)
        }
        break
      }
      case DOWN: {
        if (beats > metronomeConfig.beats.min) {
          this.handleBeatsChange(beats - 1)
        }
        break
      }
      case UP: {
        if (beats < metronomeConfig.beats.max) {
          this.handleBeatsChange(beats + 1)
        }
        break
      }
      default: {
        return
      }
    }

    e.preventDefault()
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
      <div className='Metronome'>
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
