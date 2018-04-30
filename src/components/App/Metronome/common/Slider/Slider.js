import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'

const Slider = ({ value, min, max, label, onChange }) => (
  <div className='Slider'>
    <Row>
      <Col md={{size: 8, offset: 2}} className="text-center">
        <p>
          <span className="subTitleRange">{label}</span>
          <span className="titleRange">{value}</span>
        </p>
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          className="inputRange"
          step="1"
          onChange={onChange}
        />
      </Col>
    </Row>
  </div>
)

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default Slider
