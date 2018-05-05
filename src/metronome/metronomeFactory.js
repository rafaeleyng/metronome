/* global AudioContext */
import TickWorker from './TickWorker'

function metronomeFactory(onBeat, {
  beats = 4,
  tempo = 120.0,
} = {}) {
  let currentBeats = beats
  let currentTempo = tempo

  // let audioContext = null
  let tickWorker = null // The Web Worker used to fire timer messages

  let beatIndex // What note is currently last scheduled?
  let nextBeatTime = 0.0 // when the next note is due.

  function advanceNote() {
    const beatLength = 60.0 / currentTempo
    nextBeatTime += beatLength

    beatIndex += 1 // Advance the beat number, wrap to zero
    if (beatIndex === currentBeats) {
      beatIndex = 0
    }
  }

  // function scheduleNote(noteDueTime, isFirstBeat) {
  //   const osc = audioContext.createOscillator()
  //   osc.connect(audioContext.destination)
  //   osc.frequency.value = isFirstBeat ? 880.0 : 440.0
  //   osc.start(noteDueTime)
  //   osc.stop(noteDueTime + 0.05)
  // }

  function scheduleAhead() {
    /*
      How far ahead to schedule audio (in seconds)
      This should be greater than the interval time. If the timer gets late, there will be more notes than needed already scheduled.
    */
    const scheduleAheadWindow = 0.1

    // schedule all notes due in the current time window
    while (nextBeatTime < (audioContext.currentTime + scheduleAheadWindow)) {
      scheduleNote(nextBeatTime, beatIndex)
      onBeat({ beatIndex })
      advanceNote()
    }
  }

  function togglePlay(shouldPlay) {
    if (shouldPlay) {
      beatIndex = 0 // start playing from first beat
      nextBeatTime = audioContext.currentTime + 0.1 // delay a little the first beat to avoid a glitch
      tickWorker.postMessage('start')
    } else {
      tickWorker.postMessage('stop')
    }
  }

  function init() {
    audioContext = new AudioContext()

    tickWorker = new TickWorker()
    tickWorker.onmessage = (data) => {
      if (data === 'tick') {
        scheduleAhead()
      }
    }
  }

  init()

  return {
    togglePlay,
    setTempo: (t) => { currentTempo = t },
    setBeats: (b) => { currentBeats = b },
  }
}

export default metronomeFactory
