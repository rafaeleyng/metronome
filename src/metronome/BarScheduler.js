import TickWorker from './TickWorker'

class BarScheduler {
  setTempo(tempo) {
    this.tempo = tempo
  }

  scheduleBar({
    beats,
    tempo,
    getAudioContextCurrentTime,
    onBarComplete,
    onBeat,
  }) {
    this.tempo = tempo
    let beatIndex = 0 // start playing from first beat
    let nextBeatTime = getAudioContextCurrentTime() + 0.1 // delay a little (0.1) the first beat to avoid a glitch

    const scheduleAhead = () => {
      /*
        How far ahead to schedule audio (in seconds)
        This should be greater than the interval time. If the timer gets late, there will be more notes than needed already scheduled.
      */
      const scheduleAheadWindow = 0.1

      // schedule all notes due in the current time window
      while (nextBeatTime < (getAudioContextCurrentTime() + scheduleAheadWindow)) {
        if (beatIndex === beats) {
          this.finish()
          onBarComplete()
          break
        }

        onBeat(nextBeatTime, beatIndex)
        nextBeatTime += 60.0 / this.tempo
        beatIndex += 1 // Advance the beat number, wrap to zero
      }
    }

    this.tickWorker = new TickWorker()
    this.tickWorker.onmessage = (data) => {
      if (data === 'tick') {
        scheduleAhead()
      }
    }

    this.tickWorker.postMessage('start')
  }

  finish() {
    this.tickWorker.postMessage('stop')
    delete this.tickWorker
  }
}

export default BarScheduler
