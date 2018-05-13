class RepeatSingleBarStrategy {
  constructor({ beats, tempo }) {
    this.props = {
      beats,
      tempo,
    }
  }

  nextBar() {
    return {
      beats: this.props.beats,
      tempo: this.props.tempo,
    }
  }
}

export default RepeatSingleBarStrategy
