import React from 'react'
import { FaPlay, FaStop } from 'react-icons/lib/fa'

const childProps = {
  size: '60%',
  color: '#DD8836',
}

const TogglePlay = ({ isPlaying, onClick }) => (
  <div className='TogglePlay'>
    <div
      className='TogglePlay__icon'
      onClick={onClick}
    >
      {isPlaying ? (< FaStop {...childProps} />) : (< FaPlay {...childProps} />)}
    </div>
  </div>
)


export default TogglePlay
