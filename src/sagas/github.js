import { takeEvery, put } from 'redux-saga/effects'
import api from '../services/github'

function * getRepositories () {
  try {
    const query = {
      query:
        '{user(login: "jordwalke") {repositories(first: 100) { pageInfo {hasNextPage endCursor } edges { node { name description } } } } }'
    }
    let res = yield api.query(query)
    let repos = []
    res.data.user.repositories.edges.map(r => {
      repos.push({ name: r.node.name, description: r.node.description })
    })
    yield put({ type: 'STORE_REPOS', repos: repos })
  } catch (e) {
    console.debug(e)
  }
}

function * getCommits (params) {
  try {
    let commits = []
    const query = {
      query:
        '{ repository(owner:"' +
        params.owner +
        '", name:"' +
        params.repo +
        '") { ref(qualifiedName: "master") { target { ... on Commit { history(first: 100) { pageInfo { hasNextPage endCursor } edges { node { committedDate oid messageHeadline }}}}}}}}'
    }
    const res = yield api.query(query)
    let commitsObj = res.data.repository.ref.target.history.edges
    commitsObj.map(commit => {
      commits.push(commit.node)
    })
    yield put({ type: 'STORE_COMMITS', commits: commits })
  } catch (e) {
    console.debug(e)
  }
}

function * github () {
  return yield [
    takeEvery('GET_REPOSITORIES', getRepositories),
    takeEvery('GET_COMMITS', getCommits)
  ]
}

export default github
