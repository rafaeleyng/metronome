/* global AudioContext */
import TimerWorker from './TimerWorker'

function metronomeFactory(cb, {
  beats = 4,
  tempo = 120.0,
} = {}) {
  let currentBeats = beats
  let currentTempo = tempo

  let audioContext = null
  let beatIndex // What note is currently last scheduled?
  const lookahead = 25.0 // How frequently to call scheduling function (in milliseconds)
  const scheduleAheadTime = 0.1 // How far ahead to schedule audio (sec). This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
  let nextBeatTime = 0.0 // when the next note is due.
  const noteLength = 0.05 // length of "beep" (in seconds)
  let timerWorker = null // The Web Worker used to fire timer messages

  function nextNote() {
    const secondsPerBeat = 60.0 / currentTempo // Notice this picks up the currentTempo value to calculate beat length.
    nextBeatTime += secondsPerBeat // Add beat length to last beat time

    beatIndex += 1 // Advance the beat number, wrap to zero
    if (beatIndex === currentBeats) {
      beatIndex = 0
    }
  }

  function scheduleNote(beatNumber, time) {
    const osc = audioContext.createOscillator()
    osc.connect(audioContext.destination)

    const isFirstBeat = (beatNumber % currentBeats) === 0

    if (isFirstBeat) {
      osc.frequency.value = 880.0
    } else {
      osc.frequency.value = 440.0
    }

    osc.start(time)
    osc.stop(time + noteLength)
    cb({
      beatIndex,
    })
  }

  function scheduler() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (nextBeatTime < audioContext.currentTime + scheduleAheadTime) {
      scheduleNote(beatIndex, nextBeatTime)
      nextNote()
    }
  }

  function play(shouldPlay) {
    if (shouldPlay) {
      // always start from first beat of bar
      beatIndex = 0

      // next note is due right when started playing
      nextBeatTime = audioContext.currentTime
      timerWorker.postMessage('start')
    } else {
      timerWorker.postMessage('stop')
    }
  }

  function init() {
    audioContext = new AudioContext()
    timerWorker = new TimerWorker()

    timerWorker.onmessage = (data) => {
      if (data === 'tick') {
        scheduler()
      }
    }
    timerWorker.postMessage({ interval: lookahead })
  }

  init()

  return {
    togglePlay: play,
    setTempo: (t) => { currentTempo = t },
    setBeats: (b) => { currentBeats = b },
  }
}

export default metronomeFactory
