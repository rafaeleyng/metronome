import React from 'react'
import PropTypes from 'prop-types'
import RCSlider from 'rc-slider'

const styles = {
  slider: {
    width: '300px',
  },
  p: {
    textAlign: 'center',
  },
  label: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 100,
  },
  value: {
    color: 'white',
    fontSize: '2.5rem',
    marginLeft: '12px',
  },
}

const Slider = ({
  value, min, max, label, onChange,
}) => (
  <div className="Slider" style={styles.slider}>
    <p style={styles.p}>
      <span style={styles.label}>{label}</span>
      <span style={styles.value}>{value}</span>
    </p>
    <RCSlider
      value={value}
      min={min}
      max={max}
      step={1}
      onChange={onChange}
    />
  </div>
)

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default Slider
