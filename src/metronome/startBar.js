import TickWorker from './TickWorker'

const startBar = ({
  beats,
  tempo,
  getAudioContextCurrentTime,
  firstBeatTime, // should be undefined on first bar and the parameter to `onBarComplete` on subsequent bars
  onBarComplete,
  onBeat,
}) => {
  let beatIndex = 0 // start playing from first beat
  let nextBeatTime = firstBeatTime || (getAudioContextCurrentTime() + 0.1) // delay a little (0.1) the first beat to avoid a glitch
  const noteLength = 60.0 / tempo

  const tickWorker = new TickWorker()

  const stopBar = () => {
    tickWorker.postMessage('stop')
  }

  const scheduleAhead = () => {
    /*
      How far ahead to schedule audio (in seconds)
      This should be greater than the interval time.
      If the timer gets late, there will be more notes than needed already scheduled.
    */
    const scheduleAheadWindow = 0.1

    // schedule all notes due in the current time window
    while (nextBeatTime < (getAudioContextCurrentTime() + scheduleAheadWindow)) {
      onBeat(nextBeatTime, beatIndex)
      nextBeatTime += noteLength
      beatIndex += 1

      if (beatIndex === beats) {
        onBarComplete(nextBeatTime)
        break
      }
    }
  }

  tickWorker.onmessage = (data) => {
    if (data === 'tick') {
      scheduleAhead()
    }
  }

  tickWorker.postMessage('start')

  return stopBar
}

export default startBar
