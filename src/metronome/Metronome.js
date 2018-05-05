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
    if (this.barScheduler) {
      this.barScheduler.setTempo(tempo)
    }
  }

  setBeats(beats) {
    this.props.beats = beats
  }

  play() {
    const { beats, onBeat } = this.props
    const audioContext = new AudioContext()

    const getAudioContextCurrentTime = () => audioContext.currentTime
    this.barScheduler = new BarScheduler()

    const handleBeat = (noteStartTime, beatIndex) => {
      const frequency = beatIndex === 0 ? 880.0 : 440.0
      playNote(audioContext, noteStartTime, frequency)
      onBeat({ index: beatIndex })
    }

    const handleBarComplete = () => {
      // TODO fazer regras de repetição aqui
      this.barScheduler.scheduleBar({
        beats,
        tempo: this.props.tempo,
        getAudioContextCurrentTime,

        onBarComplete: handleBarComplete,
        onBeat: handleBeat,
      })
    }

    this.barScheduler = new BarScheduler()

    this.barScheduler.scheduleBar({
      beats,
      tempo: this.props.tempo,
      getAudioContextCurrentTime,

      onBarComplete: handleBarComplete,
      onBeat: handleBeat,
    })
  }

  stop() {
    this.barScheduler.finish()
    delete this.barScheduler
  }
}

export default Metronome
