import React from 'react'
import PropTypes from 'prop-types'
import RCSlider from 'rc-slider'

const defaultStyles = {
  slider: {
    width: '100px',
    margin: '10px',
  },
  value: {
    color: 'white',
    fontSize: '1rem',
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
  },
}

const InlineSlider = ({
  value,
  min,
  max,
  onChange,
  styles,
  disabled,
}) => (
  <div className="InlineSlider" style={{ ...defaultStyles.slider, ...styles.slider }}>
    <span style={defaultStyles.value}>{value}</span>
    <RCSlider
      disabled={disabled}
      value={value}
      min={min}
      max={max}
      step={1}
      onChange={onChange}
    />
  </div>
)

InlineSlider.propTypes = {
  disabled: PropTypes.bool,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  styles: PropTypes.object,
}

InlineSlider.defaultProps = {
  disabled: false,
  styles: {},
}

export default InlineSlider
