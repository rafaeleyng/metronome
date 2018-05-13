import React from 'react'
import PropTypes from 'prop-types'
import RCSlider from 'rc-slider'

const defaultStyles = {
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

const BlockSlider = ({
  value,
  min,
  max,
  label,
  onChange,
  styles,
}) => (
  <div className="BlockSlider" style={{ ...defaultStyles.slider, ...styles.slider }}>
    <p style={defaultStyles.p}>
      <span style={defaultStyles.label}>{label}</span>
      <span style={defaultStyles.value}>{value}</span>
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

BlockSlider.propTypes = {
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  styles: PropTypes.object,
}

BlockSlider.defaultProps = {
  styles: {},
}

export default BlockSlider
