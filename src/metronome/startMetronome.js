/* global AudioContext */
import playNote from './playNote'
import startBar from './startBar'

const startMetronome = ({
  barExecutionStrategy,
  onBeat,
  onBarComplete = () => {},
  onComplete = () => {},
}) => {
  let barIndex = 0
  const audioContext = new AudioContext()
  const getAudioContextCurrentTime = () => audioContext.currentTime

  const handleBeat = (noteStartTime, beatIndex) => {
    playNote(audioContext, noteStartTime, beatIndex)
    onBeat({ index: beatIndex })
  }

  let stopBar

  const handleBarComplete = (nextBeatTime) => {
    onBarComplete({ index: barIndex })
    barIndex += 1
    stopBar()

    const bar = barExecutionStrategy.nextBar()
    if (!bar) {
      onComplete()
      return
    }

    stopBar = startBar({
      bar,
      getAudioContextCurrentTime,
      firstBeatTime: nextBeatTime,
      onBarComplete: handleBarComplete,
      onBeat: handleBeat,
    })
  }

  const stopMetronome = () => {
    audioContext.close()
    stopBar()
  }

  const bar = barExecutionStrategy.nextBar()
  if (!bar) {
    onComplete()
    return stopMetronome
  }

  stopBar = startBar({
    bar,
    getAudioContextCurrentTime,
    onBarComplete: handleBarComplete,
    onBeat: handleBeat,
  })

  return stopMetronome
}

export default startMetronome
