import React from 'react'
import { Row, Col } from 'reactstrap'

import './header.scss'

const Header = props => {
  return (
    <Row styleName='App-header'>
      <Col xs='1'>
        <img
          src='https://avatars2.githubusercontent.com/u/3812639?s=460&v=4'
          styleName='profileImage'
        />
      </Col>
      <Col xs='4'>
        <h1>JR Chew</h1>
        <span>Software Engineer</span>
      </Col>
      <Col xs='7'>
        <a href='/' styleName='signIn'>
          Sign Out
        </a>
      </Col>
    </Row>
  )
}

export default Header
