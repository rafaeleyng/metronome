import React, { Component } from 'react'
import uniqueId from 'lodash/uniqueId'

import { MdAdd } from 'react-icons/lib/md'

import Beats from '../common/Beats'
import TogglePlay from '../common/TogglePlay'
import BarsGroup from './BarsGroup'

import PlayScoreStrategy from '../../../metronome/barExecutionStrategies/PlayScoreStrategy'
import barsGroupsExpander from '../../../metronome/barExecutionStrategies/PlayScoreStrategy/barsGroupsExpander'

import startMetronome from '../../../metronome/startMetronome'

const iconStyle = {
  size: 30,
  color: '#919191',
}

const constDefaultBarsGroupValues = {
  beats: 4,
  tempo: 120,
  qty: 1,
}

const newGroup = () => ({
  id: uniqueId(),
  ...constDefaultBarsGroupValues,
})

class Score extends Component {
  state = {
    bars: [],
    currentBeat: null,
    currentBar: 0,
    groups: [newGroup()],
    isPlaying: false,
  }

  startMetronome() {
    const { groups } = this.state
    const bars = barsGroupsExpander(groups)
    const barExecutionStrategy = new PlayScoreStrategy({ bars })
    this.setState({
      bars,
      stopMetronome: startMetronome({
        barExecutionStrategy,
        onBeat: this.handleBeat,
        onBarComplete: this.handleBarComplete,
        onComplete: this.handleComplete,
      }),
    })
  }

  stopMetronome() {
    this.state.stopMetronome()
    this.setState({
      bars: [],
    })
  }

  restartMetronome = () => {
    if (this.state.isPlaying) {
      this.stopMetronome()
      this.startMetronome()
    }
  }

  handleBeat = ({ index }) => {
    this.setState({ currentBeat: index })
  }

  handleBarComplete = ({ index }) => {
    this.setState({ currentBar: index + 1 })
  }

  handleComplete = () => {
    this.handleTogglePlay()
  }

  handleTogglePlay = () => {
    const shouldPlay = !this.state.isPlaying

    if (shouldPlay) {
      this.startMetronome()
    } else {
      this.stopMetronome()
    }

    this.setState({
      currentBeat: null,
      currentBar: 0,
      isPlaying: shouldPlay,
    })
  }

  handleAddGroup = () => {
    const { groups } = this.state
    this.setState({
      groups: [...groups, newGroup()],
    })
  }

  handleRemoveGroup = (group) => {
    if (this.state.groups.length < 2) {
      return
    }
    this.setState({
      groups: this.state.groups.filter(g => g !== group),
    })
  }

  handleChangeQty = (group, qty) => {
    this.setState({
      groups: this.state.groups.map(g => (g === group ? { ...g, qty } : g)),
    })
  }

  handleChangeBeats = (group, beats) => {
    this.setState({
      groups: this.state.groups.map(g => (g === group ? { ...g, beats } : g)),
    })
  }

  handleChangeTempo = (group, tempo) => {
    this.setState({
      groups: this.state.groups.map(g => (g === group ? { ...g, tempo } : g)),
    })
  }

  render() {
    const {
      bars,
      currentBeat,
      currentBar,
      isPlaying,
      groups,
    } = this.state

    let currentBeats = null
    if (bars && bars[currentBar]) {
      currentBeats = bars[currentBar].beats
    }

    const onRemoveGroup = this.state.groups.length > 1 ? this.handleRemoveGroup : undefined

    return (
      <div className="Score">
        <TogglePlay isPlaying={isPlaying} onClick={this.handleTogglePlay} />
        {currentBeats && <Beats beats={currentBeats} current={currentBeat} />}
        <div className="Score__groups">
          {groups.map(group => (<BarsGroup
            disabled={isPlaying}
            key={group.id}
            group={group}
            onChangeBeats={this.handleChangeBeats}
            onChangeTempo={this.handleChangeTempo}
            onChangeQty={this.handleChangeQty}
            onRemove={onRemoveGroup}
          />))}
        </div>
        <div>
          <MdAdd onClick={this.handleAddGroup} {...iconStyle} />
        </div>
      </div>
    )
  }
}

export default Score
