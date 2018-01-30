import { takeEvery, put, select } from 'redux-saga/effects'

const api = {
  query (query, token) {
    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'token ' + token
      },
      body: JSON.stringify(query)
    })
      .then(response => response.json())
      .then(json => {
        return json
      })
  },
  get (endpoint) {
    return fetch(endpoint, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        return json
      })
  }
}

function * getRepositories () {
  try {
    const query = {
      query:
        '{user(login: "jordwalke") {repositories(first: 100) { pageInfo {hasNextPage endCursor } edges { node { name description } } } } }'
    }
    let res = api.query(query)
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
    const state = yield select()
    const token = state.gitHub.token
    let commits = []
    const query = {
      query:
        '{ repository(owner:"' +
        params.owner +
        '", name:"' +
        params.repo +
        '") { ref(qualifiedName: "master") { target { ... on Commit { history(first: 100) { pageInfo { hasNextPage endCursor } edges { node { committedDate oid messageHeadline }}}}}}}}'
    }
    const res = yield api.query(query, token)
    let commitsObj = res.data.repository.ref.target.history.edges
    commitsObj.map(commit => {
      commits.push(commit.node)
    })
    yield put({ type: 'STORE_COMMITS', commits: commits })
  } catch (e) {
    console.debug(e)
  }
}

function * getAccessToken (params) {
  try {
    const token = yield api.get(
      'http://localhost:9999/authenticate/' + params.code
    )
    yield put({ type: 'STORE_TOKEN', token: token.token })
  } catch (e) {
    console.debug(e)
  }
}

function * github () {
  return yield [
    takeEvery('GET_REPOSITORIES', getRepositories),
    takeEvery('GET_COMMITS', getCommits),
    takeEvery('GET_ACCESS_TOKEN', getAccessToken)
  ]
}

export default github
