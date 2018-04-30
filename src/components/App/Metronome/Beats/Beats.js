import React from 'react'
import PropTypes from 'prop-types'
import times from 'lodash/times'
import { Col } from 'reactstrap'

import Beat from './Beat'

const Beats = ({ beats, current }) => (
  times(beats, () => null)
    .map((value, i) => (
      <Col md={{size: 1}} sm={{size: 1}} className="beatCol" key={i}>
        <Beat isCurrent={current === i} />
      </Col>
    ))
)

Beats.propTypes = {
  beats: PropTypes.number.isRequired,
  current: PropTypes.number,
}

Beats.defaultProps = {
  current: null,
}

export default Beats
