import React from 'react'
import PropTypes from 'prop-types'

import Slider from '../common/Slider'

import metronomeConfig from '../../../../config/metronome'

const BeatsSlider = ({ value, onChange }) => (
  <div className="BeatsSlider">
    <Slider
      label="Beats"
      max={metronomeConfig.beats.max}
      min={metronomeConfig.beats.min}
      onChange={onChange}
      value={value}
    />
  </div>
)

BeatsSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default BeatsSlider
