import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

import Home from 'components/Home'
import Repo from 'components/Repo'

import './app.scss'

const mapStateToProps = state => {
  return {
    token: state.gitHub.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAccessToken: code => dispatch({ type: 'GET_ACCESS_TOKEN', code: code })
  }
}

const params = location.search.substring(1)

class App extends Component {
  constructor (props) {
    super(props)

    const accessCode = this.unserialize(params).code
    if (accessCode) {
      this.props.getAccessToken(accessCode)
    }
  }

  render () {
    return <Router>{this.content()}</Router>
  }

  authed () {
    return (
      <main>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col xs='3'>
            <Sidebar />
          </Col>
          <Col xs='9'>
            <Route exact path='/' component={Home} />
            <Route
              path='/repo/:owner/:repo'
              render={router => <Repo router={router} />}
            />
          </Col>
        </Row>
      </main>
    )
  }

  unauthed () {
    return (
      <main>
        <Row>
          <Col>
            <a
              href='https://github.com/login/oauth/authorize?client_id=bb4d440c99a91c70bbb7&redirect_uri=http://localhost:3000&state=fdadsfe&allow_signup=true'
              styleName='login'
            >
              GitHub Sign In
            </a>
          </Col>
        </Row>
      </main>
    )
  }

  content () {
    return this.props.token ? this.authed() : this.unauthed()
  }

  unserialize (str) {
    str = decodeURIComponent(str)
    let chunks = str.split('&')
    let obj = {}
    for (let c = 0; c < chunks.length; c++) {
      let split = chunks[c].split('=', 2)
      obj[split[0]] = split[1]
    }
    return obj
  }
}

App.propTypes = {
  getAccessToken: PropTypes.func.isRequired,
  token: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
