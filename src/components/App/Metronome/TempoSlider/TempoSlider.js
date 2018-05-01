import React from 'react'
import PropTypes from 'prop-types'

import Slider from '../common/Slider'

import metronomeConfig from '../../../../config/metronome'

const TempoSlider = ({ value, onChange }) => (
  <div className="TempoSlider">
    <Slider
      label="Tempo"
      max={metronomeConfig.tempo.max}
      min={metronomeConfig.tempo.min}
      onChange={onChange}
      value={value}
    />
  </div>
)

TempoSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default TempoSlider
