import React from 'react'
import PropTypes from 'prop-types'

import Slider from '../common/Slider'

const TempoSlider = ({ value, onChange }) => (
  <Slider
    label='Tempo'
    max='200'
    min='40'
    onChange={onChange}
    value={value}
  />
)

TempoSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default TempoSlider
