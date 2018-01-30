import React from 'react'
import { Row, Col } from 'reactstrap'

import './header.scss'

const Header = props => {
  return (
    <Row styleName='App-header'>
      <Col xs='1'>
        <a href='/'>
          <img
            src='https://aboutme.imgix.net/background/users/j/r/c/jrchew_1513021400_892.jpg?q=40&dpr=2&auto=format&fit=max&w=120&h=120&rect=0,128,480,480'
            styleName='profileImage'
          />
        </a>
      </Col>
      <Col xs='11'>
        <h1>
          <a href='/'>JR Chew</a>
        </h1>
        <span>Software Engineer</span>
      </Col>
    </Row>
  )
}

export default Header
