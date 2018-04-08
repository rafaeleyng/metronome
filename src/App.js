import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  state = {
    isPlaying: false,
    beats: 4,
    tempo: 120,
  }

  handleBeatsChange = (e) => {
    this.setState({
      beats: e.target.value,
    })
  }

  handleTempoChange = (e) => {
    this.setState({
      tempo: e.target.value,
    })
  }

  handleTogglePlay = () => {
    const { isPlaying } = this.state
    this.setState({
      isPlaying: !isPlaying,
    })
  }

  renderTogglePlay = () => {
    const { isPlaying } = this.state
    return (
      <button
        type="button"
        onClick={this.handleTogglePlay}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    )
  }

  renderTempo = () => {
    return (
      <Fragment>
        <input
          type="range"
          value={this.state.tempo}
          min="40"
          max="200"
          step="1"
          onChange={this.handleTempoChange}
        />
        <p>Tempo: {this.state.tempo}</p>
      </Fragment>
    )
  }

  renderBeats = () => {
    return (
      <Fragment>
        <input
          type="range"
          value={this.state.beats}
          min="2"
          max="20"
          onChange={this.handleBeatsChange}
        />
        <p>Beats: {this.state.beats}</p>
      </Fragment>
    )
  }

  render() {
    return (
      <div className="App">
        {this.renderTogglePlay()}
        <hr/>
        {this.renderTempo()}
        <hr/>
        {this.renderBeats()}
      </div>
    );
  }
}

export default App;
