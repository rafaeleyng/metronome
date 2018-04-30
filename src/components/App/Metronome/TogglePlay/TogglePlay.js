import React from 'react'
import { Row, Col } from 'reactstrap'
import { FaPlay, FaStop } from 'react-icons/lib/fa'

const childProps = {
  size: "60%",
  className: "center",
  color: "#DD8836",
}

const TogglePlay = ({ isPlaying, onClick }) => (
  <Row>
    <Col
      md={{size: 4, offset: 4}}
      className="buttonCircle text-center"
      onClick={onClick}
    >
      {isPlaying ? (< FaStop {...childProps} />) : (< FaPlay {...childProps} />)}
    </Col>
  </Row>
)


export default TogglePlay
