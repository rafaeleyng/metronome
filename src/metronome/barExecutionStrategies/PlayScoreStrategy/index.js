class PlayScoreStrategy {
  constructor({ barGroups }) {
    this.state = {
      currentBar: 0,
    }

    this.props = {
      barGroups,
    }
  }

  nextBar() {
    const nextBar = this.props.barGroups[this.state.currentBar]
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
