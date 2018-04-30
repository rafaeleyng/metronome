import React from 'react'
import PropTypes from 'prop-types'

import Slider from '../common/Slider'

const BeatsSlider = ({ value, onChange }) => (
  <Slider
    label='Beats'
    max='12'
    min='2'
    onChange={onChange}
    value={value}
  />
)

BeatsSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default BeatsSlider
