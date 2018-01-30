import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'
import LineChart from '../LineChart'

import './repo.scss'

const mapStateToProps = state => {
  return {
    commits: state.gitHub.commits
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCommits: fields => dispatch({ type: 'GET_COMMITS', ...fields })
  }
}

const Repo = class Repo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repo: props.router.match.params.repo
    }
    this.props.getCommits({
      owner: props.router.match.params.owner,
      repo: props.router.match.params.repo
    })
  }

  componentWillReceiveProps (nextProps) {
    const { router } = nextProps
    this.setState({ repo: router.match.params.repo })
    if (this.state.repo !== nextProps.router.match.params.repo) {
      this.props.getCommits({
        owner: nextProps.router.match.params.owner,
        repo: nextProps.router.match.params.repo
      })
    }
  }

  render () {
    const { commits, router } = this.props
    const { repo } = this.state

    return (
      <div styleName='container'>
        <Row>
          <Col>
            <Breadcrumb>
              <BreadcrumbItem>Repos</BreadcrumbItem>
              <BreadcrumbItem>{router.match.params.owner}</BreadcrumbItem>
              <BreadcrumbItem active>{repo}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{repo.description}</p>
          </Col>
        </Row>
        <Row>
          <Col xs='8'>
            <h3>Project Activity</h3>
            <LineChart data={this.chartData()} />

            <h3>Commits</h3>
            <ListGroup>{this.commits(commits)}</ListGroup>
          </Col>
        </Row>
      </div>
    )
  }

  commits (commits) {
    let out = []
    commits.map((c, i) => {
      out.push(
        <ListGroupItem key={'commit-' + i}>
          {c.committedDate.substring(0, 10)} - {c.messageHeadline}
        </ListGroupItem>
      )
    })
    return out
  }

  uniques (array, key, len) {
    return array.reduce((carry, item) => {
      if (item[key] && !~carry.indexOf(item[key].substring(0, len))) {
        carry.push(item[key].substring(0, len))
      }
      return carry
    }, [])
  }

  // format our chart data
  chartData () {
    let data = []
    let uniques = this.uniques(this.props.commits, 'committedDate', 7)
    let len = uniques.length > 5 ? 7 : 10
    let uniqueDays = this.uniques(this.props.commits, 'committedDate', len)
    uniqueDays.map(u => {
      data.push([u, 0])
    })
    this.props.commits.map(c => {
      if (uniqueDays.indexOf(c.committedDate.substring(0, len)) > -1) {
        let pos = uniqueDays.indexOf(c.committedDate.substring(0, len))
        data[pos][1] += 1
      }
    })
    return data
  }
}

Repo.propTypes = {
  router: PropTypes.object.isRequired,
  getCommits: PropTypes.func.isRequired,
  commits: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Repo)
