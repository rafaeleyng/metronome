import React from 'react'
import PropTypes from 'prop-types'

const Beat = ({ isCurrent }) => (
  <div
    className={`Beat ${isCurrent ? 'Beat--current-beat' : ''}`}
  />
)

Beat.propTypes = {
  isCurrent: PropTypes.bool,
}

Beat.defaultProps = {
  isCurrent: false,
}

export default Beat
