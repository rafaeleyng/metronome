import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NumericInput from 'react-numeric-input'

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
    onChangeQuantity: PropTypes.func.isRequired,
    onChangeTempo: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onRemove: undefined,
  }

  handleChangeBeats = (beats) => {
    const { onChangeBeats, group } = this.props
    onChangeBeats(group, beats)
  }

  handleChangeQuantity = (quantity) => {
    const { onChangeQuantity, group } = this.props
    onChangeQuantity(group, quantity)
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
    const { beats, tempo, quantity } = group

    const styles = {
      quantity: {
        input: {
          color: '#DC8836',
          width: '80px',
          border: 'none',
          backgroundColor: 'transparent',
        },
        'input:focus': {
          outline: 'none',
        },

        minus: {
          backgroundColor: '#919191',
          cursor: 'pointer',
          width: '16px',
          marginLeft: '-8px',
        },
        plus: {
          backgroundColor: '#919191',
          cursor: 'pointer',
          height: '16px',
          marginTop: '-8px',
        },
      },
    }

    return (
      <div className="BarsGroup">
        <NumericInput
          className="BarsGroup__quantity"
          min={1}
          max={99}
          strict
          mobile
          onChange={this.handleChangeQuantity}
          value={quantity}
          style={styles.quantity}
          readOnly={disabled}
        />
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
