import React from 'react'
import PropTypes from 'prop-types'
import { MdPlayArrow, MdStop } from 'react-icons/lib/md'

const iconProps = {
  size: '80%',
  color: '#DD8836',
}

const TogglePlay = ({ isPlaying, onClick }) => (
  <div className="TogglePlay">
    <div
      className="TogglePlay__icon"
      onClick={onClick}
    >
      {isPlaying ? (<MdStop {...iconProps} />) : (<MdPlayArrow {...iconProps} />)}
    </div>
  </div>
)

TogglePlay.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TogglePlay
