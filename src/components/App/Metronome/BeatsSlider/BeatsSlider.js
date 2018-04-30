import React from 'react'
import PropTypes from 'prop-types'

import Slider from '../common/Slider'

const BeatsSlider = ({ value, onChange }) => (
  <div className='BeatsSlider'>
    <Slider
      label='Beats'
      max={7}
      min={2}
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
