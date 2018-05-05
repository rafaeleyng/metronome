const playNote = (audioContext, noteStartTime, beatIndex) => {
  const frequency = beatIndex === 0 ? 880.0 : 440.0
  const osc = audioContext.createOscillator()
  osc.connect(audioContext.destination)
  osc.frequency.value = frequency
  osc.start(noteStartTime)
  osc.stop(noteStartTime + 0.05)
}

export default playNote
