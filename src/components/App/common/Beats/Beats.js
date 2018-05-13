import React from 'react'
import PropTypes from 'prop-types'
import times from 'lodash/times'

import Beat from './Beat'

const Beats = ({ beats, current }) => (
  <div className="Beats">
    {/* eslint-disable react/no-array-index-key */}
    {times(beats).map((value, i) => (<Beat key={i} isCurrent={current === i} />))}
    {/* eslint-enable react/no-array-index-key */}
  </div>
)

Beats.propTypes = {
  beats: PropTypes.number.isRequired,
  current: PropTypes.number,
}

Beats.defaultProps = {
  current: null,
}

export default Beats
