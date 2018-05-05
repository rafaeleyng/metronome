/* global AudioContext */
import playNote from './playNote'
import startBar from './startBar'

const startMetronome = ({ beats, tempo, onBeat }) => {
  const audioContext = new AudioContext()
  const getAudioContextCurrentTime = () => audioContext.currentTime

  const handleBeat = (noteStartTime, beatIndex) => {
    playNote(audioContext, noteStartTime, beatIndex)
    onBeat({ index: beatIndex })
  }

  let stopBar

  const handleBarComplete = (nextBeatTime) => {
    stopBar()
    stopBar = startBar({
      beats,
      tempo,
      getAudioContextCurrentTime,
      firstBeatTime: nextBeatTime,
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
    audioContext.close()
    stopBar()
  }

  return stopMetronome
}

export default startMetronome
