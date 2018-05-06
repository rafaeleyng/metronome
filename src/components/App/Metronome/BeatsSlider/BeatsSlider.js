import React from 'react'
import PropTypes from 'prop-types'

import BlockSlider from '../../common/BlockSlider'

import metronomeConfig from '../../../../config/metronome'

const BeatsSlider = ({ value, onChange }) => (
  <div className="BeatsSlider">
    <BlockSlider
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
