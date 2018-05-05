/* global AudioContext */
import startBar from './startBar'

const playNote = (audioContext, noteStartTime, frequency) => {
  const osc = audioContext.createOscillator()
  osc.connect(audioContext.destination)
  osc.frequency.value = frequency
  osc.start(noteStartTime)
  osc.stop(noteStartTime + 0.05)
}

const startMetronome = ({ beats, tempo, onBeat }) => {
  const audioContext = new AudioContext()
  const getAudioContextCurrentTime = () => audioContext.currentTime

  const handleBeat = (noteStartTime, beatIndex) => {
    const frequency = beatIndex === 0 ? 880.0 : 440.0
    playNote(audioContext, noteStartTime, frequency)
    onBeat({ index: beatIndex })
  }

  let stopBar

  const handleBarComplete = (nextBeatStart) => {
    stopBar()
    stopBar = startBar({
      beats,
      tempo,
      getAudioContextCurrentTime,
      nextBeatStart,
      onBarComplete: handleBarComplete,
      onBeat: handleBeat,
    })
  }

  stopBar = startBar({
    beats,
    tempo,
    getAudioContextCurrentTime,
    onBarComplete: handleBarComplete,
    onBeat: handleBeat,
  })

  const stopMetronome = () => {
    stopBar()
  }

  return stopMetronome
}

export default startMetronome
