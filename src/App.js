import React, { Component, Fragment } from 'react';
import times from 'lodash/times'

import './App.css';

function metronomeFactory(cb, {
  tempo = 120.0,
  beats = 4,
} = {}) {
  var audioContext = null;
  // var isPlaying = false;      // Are we currently playing?
  var beatIndex;        // What note is currently last scheduled?
  // var tempo = 120.0;          // tempo (in beats per minute)
  var lookahead = 25.0;       // How frequently to call scheduling function
                              //(in milliseconds)
  var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                              // This is calculated from lookahead, and overlaps
                              // with next interval (in case the timer is late)
  var nextBeatTime = 0.0;     // when the next note is due.
  // var noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
  var noteLength = 0.05;      // length of "beep" (in seconds)
  // var notesInQueue = [];      // the notes that have been put into the web audio,
                              // and may or may not have played yet. {note, time}
  var timerWorker = null;     // The Web Worker used to fire timer messages

  const TimerWorker = function() {
    this.timerID = null
    this.interval = 100

    this.postMessage = (data) => {
      if (data.interval) {
        this.interval = data.interval
        if (this.timerID) {
          clearInterval(this.timerID)
          this.timerID = setInterval(() => {
            this.onmessage("tick")
          }, this.interval)
        }
      } else if (data === "start") {
        this.timerID = setInterval(() => {
          this.onmessage("tick")
        }, this.interval)
      } else if (data === "stop") {
        clearInterval(this.timerID)
        this.timerID = null
      }
    }
  }

  function nextNote() {
      // Advance current note and time by a 16th note...
      var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT
                                            // tempo value to calculate beat length.
      // nextBeatTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
      nextBeatTime += secondsPerBeat;    // Add beat length to last beat time

      beatIndex++;    // Advance the beat number, wrap to zero
      if (beatIndex == beats) {
          beatIndex = 0;
      }
  }

  function scheduleNote( beatNumber, time ) {
      // // push the note on the queue, even if we're not playing.
      // notesInQueue.push( { note: beatNumber, time: time } );

      // if ( (noteResolution==1) && (beatNumber%2))
      //     return; // we're not playing non-8th 16th notes
      // if ( (noteResolution==2) && (beatNumber%4))
      //     return; // we're not playing non-quarter 8th notes

      // create an oscillator
      var osc = audioContext.createOscillator();
      osc.connect( audioContext.destination );
      if (beatNumber % beats === 0) {
        osc.frequency.value = 880.0
      } else {
        osc.frequency.value = 440.0
      }

      osc.start( time );
      osc.stop( time + noteLength );
      cb({
        beatIndex,
      })
  }

  function scheduler() {
      // while there are notes that will need to play before the next interval,
      // schedule them and advance the pointer.
      while (nextBeatTime < audioContext.currentTime + scheduleAheadTime ) {
          scheduleNote( beatIndex, nextBeatTime );
          nextNote();
      }
  }

  function play(shouldPlay) {
      if (shouldPlay) {
        // always start from first beat of bar
        beatIndex = 0;

        // next note is due right when started playing
        nextBeatTime = audioContext.currentTime;
        timerWorker.postMessage("start");
      } else {
        timerWorker.postMessage("stop");
      }
  }

  function init(){
      audioContext = new AudioContext();
      timerWorker = new TimerWorker();

      timerWorker.onmessage = function(data) {
        if (data == "tick") {
          scheduler();
        }
      };
      timerWorker.postMessage({"interval":lookahead});
  }

  init()

  return {
    togglePlay: play,
    setTempo: (t) => { tempo = t },
    setBeats: (b) => { beats = b },
  }
}

class App extends Component {
  state = {
    currentBeatIndex: null,
    isPlaying: false,
    beats: 4,
    tempo: 120,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const options = {
      beats: this.state.beats,
      tempo: this.state.tempo,
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
          max="7"
          onChange={this.handleBeatsChange}
        />
        <p>Beats: {this.state.beats}</p>
      </Fragment>
    )
  }

  renderMetronome = () => {
    const { beats, currentBeatIndex } = this.state
    return (
      times(beats, () => null)
        .map((value, i) => (<span style={{ marginRight: '4px' }} className={(currentBeatIndex === i) ? 'current' : ''} key={i}>{i === 0 ? '<beat>' : 'beat'}</span>))
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
        <hr/>
        {this.renderMetronome()}
      </div>
    );
  }
}

export default App;
