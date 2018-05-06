class PlayScoreStrategy {
  constructor({ bars }) {
    this.state = {
      currentBar: 0,
    }

    this.props = {
      bars,
    }
  }

  nextBar() {
    const nextBar = this.props.bars[this.state.currentBar]
    this.state.currentBar += 1

    if (!nextBar) {
      return undefined
    }

    return {
      ...nextBar,
    }
  }
}

export default PlayScoreStrategy
