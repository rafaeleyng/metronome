import { Component } from 'react'
import PropTypes from 'prop-types'

import metronomeConfig from '../../../../config/metronome'

class MetronomeKeyboardHandler extends Component {
  componentDidMount() {
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

    const {
      beats,
      tempo,
      onBeatsChange,
      onTempoChange,
      onTogglePlay,
    } = this.props

    switch (e.keyCode) {
      case SPACE: {
        onTogglePlay()
        break
      }
      case LEFT: {
        if (tempo > metronomeConfig.tempo.min) {
          onTempoChange(tempo - 1)
        }
        break
      }
      case RIGHT: {
        if (tempo < metronomeConfig.tempo.max) {
          onTempoChange(tempo + 1)
        }
        break
      }
      case DOWN: {
        if (beats > metronomeConfig.beats.min) {
          onBeatsChange(beats - 1)
        }
        break
      }
      case UP: {
        if (beats < metronomeConfig.beats.max) {
          onBeatsChange(beats + 1)
        }
        break
      }
      default: {
        return
      }
    }

    e.preventDefault()
  }

  render() {
    return null
  }
}

MetronomeKeyboardHandler.propTypes = {
  beats: PropTypes.number.isRequired,
  tempo: PropTypes.number.isRequired,
  onBeatsChange: PropTypes.func.isRequired,
  onTempoChange: PropTypes.func.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
}

export default MetronomeKeyboardHandler
