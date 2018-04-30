import React from 'react'
import PropTypes from 'prop-types'

import Slider from '../common/Slider'

const TempoSlider = ({ value, onChange }) => (
  <div className='TempoSlider'>
    <Slider
      label='Tempo'
      max={200}
      min={40}
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
