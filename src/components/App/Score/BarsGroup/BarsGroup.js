import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MdClear } from 'react-icons/lib/md'

import InlineSlider from '../../common/InlineSlider'
import metronomeConfig from '../../../../config/metronome'

const iconStyle = {
  size: 30,
  color: '#919191',
}

class BarsGroup extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    group: PropTypes.object.isRequired,
    onRemove: PropTypes.func,
    onChangeBeats: PropTypes.func.isRequired,
    onChangeTempo: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onRemove: undefined,
  }

  handleChangeBeats = (beats) => {
    const { onChangeBeats, group } = this.props
    onChangeBeats(group, beats)
  }

  handleChangeTempo = (tempo) => {
    const { onChangeTempo, group } = this.props
    onChangeTempo(group, tempo)
  }

  handleRemove = () => {
    this.props.onRemove(this.props.group)
  }

  render() {
    const { disabled, group, onRemove } = this.props
    const { beats, tempo } = group

    return (
      <div className="BarsGroup">
        <InlineSlider
          disabled={disabled}
          max={metronomeConfig.beats.max}
          min={metronomeConfig.beats.min}
          onChange={this.handleChangeBeats}
          value={beats}
        />
        <InlineSlider
          disabled={disabled}
          max={metronomeConfig.tempo.max}
          min={metronomeConfig.tempo.min}
          onChange={this.handleChangeTempo}
          value={tempo}
        />
        {onRemove && (<MdClear onClick={this.handleRemove} {...iconStyle} />)}
      </div>
    )
  }
}

export default BarsGroup
