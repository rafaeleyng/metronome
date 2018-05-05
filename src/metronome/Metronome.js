/* global AudioContext */
import BarScheduler from './BarScheduler'

const playNote = (audioContext, noteStartTime, frequency) => {
  const osc = audioContext.createOscillator()
  osc.connect(audioContext.destination)
  osc.frequency.value = frequency
  osc.start(noteStartTime)
  osc.stop(noteStartTime + 0.05)
}

class Metronome {
  constructor(props) {
    this.props = props
  }

  setTempo(tempo) {
    this.props.tempo = tempo
  }

  setBeats(beats) {
    this.props.beats = beats
  }

  play() {
    const { beats, tempo, onBeat } = this.props
    const audioContext = new AudioContext()

    const getAudioContextCurrentTime = () => audioContext.currentTime
    this.barScheduler = new BarScheduler()

    const handleBeat = (noteStartTime, beatIndex) => {
      const frequency = beatIndex === 0 ? 880.0 : 440.0
      playNote(audioContext, noteStartTime, frequency)
      onBeat({ index: beatIndex })
    }

    let handleBarComplete

    const scheduleBar = () => {
      this.barScheduler.scheduleBar({
        beats,
        tempo,
        getAudioContextCurrentTime,

        onBarComplete: handleBarComplete,
        onBeat: handleBeat,
      })
    }

    handleBarComplete = () => {
      // TODO fazer regras de repetição aqui
      scheduleBar()
    }

    this.barScheduler = new BarScheduler()
  }

  stop() {
    this.barScheduler.finish()
    delete this.barScheduler
  }
}

export default Metronome
