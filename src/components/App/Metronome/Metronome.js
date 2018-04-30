import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import Beats from './Beats'
import BeatsSlider from './BeatsSlider'
import TempoSlider from './TempoSlider'
import TogglePlay from './TogglePlay'

import metronomeFactory from '../../../metronome/metronomeFactory'

class Metronome extends Component {
  state = {
    currentBeatIndex: null,
    isPlaying: false,
    beats: '4',
    tempo: '120',
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
    const beats = e.target.value
    this.setState({
      beats,
    }, () => {
      this.state.metronome.setBeats(beats)

      // TODO refatorar esse restart do play
      this.state.metronome.togglePlay(false)
      this.state.metronome.togglePlay(true)
    })
  }

  handleTempoChange = (e) => {
    const tempo = e.target.value
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
        <Row id="subRoot">
          <Col md={{size:6, offset:3}} xs={{size:12}} className="app">
            <Row className="line">
              <Col md={{size: 12}}>
                <TogglePlay isPlaying={isPlaying} onClick={this.handleTogglePlay} />
              </Col>
            </Row>
            <Row className="line">
              <Col md={{size: 10, offset: 1}} xs={{size: 12}}>
                <Row>
                  <Beats beats={parseInt(beats, 10)} current={currentBeatIndex} />
                </Row>
              </Col>
            </Row>
            <Row className="line">
              <Col md={{size: 12}}>
                <BeatsSlider onChange={this.handleBeatsChange} value={beats} />
              </Col>
            </Row>
            <Row className="line">
              <Col md={{size: 12}}>
                <TempoSlider onChange={this.handleTempoChange} value={tempo} />
              </Col>
            </Row>
          </Col>
        </Row>
    )
  }
}

export default Metronome
