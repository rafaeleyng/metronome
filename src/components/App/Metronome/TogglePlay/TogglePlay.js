import React from 'react'
import PropTypes from 'prop-types'
import { FaPlay, FaStop } from 'react-icons/lib/fa'

const childProps = {
  size: '60%',
  color: '#DD8836',
}

const TogglePlay = ({ isPlaying, onClick }) => (
  <div className="TogglePlay">
    <div
      className="TogglePlay__icon"
      onClick={onClick}
    >
      {isPlaying ? (<FaStop {...childProps} />) : (<FaPlay {...childProps} />)}
    </div>
  </div>
)

TogglePlay.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TogglePlay
