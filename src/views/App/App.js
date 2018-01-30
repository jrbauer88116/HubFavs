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
    repos: state.gitHub.repos
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

class App extends Component {
  render () {
    const { repos } = this.props
    return (
      <Router>
        <main>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>

          <Row>
            <Col xs='3'>
              <Sidebar repos={repos} />
            </Col>
            <Col xs='9'>
              <Route exact path='/' component={Home} />
              <Route
                path='/repo/:owner/:repo'
                render={router => <Repo router={router} repos={repos} />}
              />
            </Col>
          </Row>
        </main>
      </Router>
    )
  }
}

App.propTypes = {
  repos: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
