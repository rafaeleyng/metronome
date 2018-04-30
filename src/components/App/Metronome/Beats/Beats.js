import React from 'react'
import PropTypes from 'prop-types'
import times from 'lodash/times'

import Beat from './Beat'

const Beats = ({ beats, current }) => (
  <div className='Beats'>
    {times(beats).map((value, i) => (<Beat key={i} isCurrent={current === i} />))}
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
