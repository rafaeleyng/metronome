import React from 'react'
import PropTypes from 'prop-types'

const Beats = ({ isCurrent }) => (
  <div className={isCurrent ? 'beat current' : 'beat'} />
)

Beats.propTypes = {
  isCurrent: PropTypes.bool,
}

Beats.defaultProps = {
  isCurrent: false,
}

export default Beats
