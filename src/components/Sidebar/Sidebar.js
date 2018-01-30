import React from 'react'
import { Link } from 'react-router-dom'

import './sidebar.scss'

function repoList (repos) {
  let list = []

  repos.map((r, i) => {
    let link = '/repo/' + r.owner + '/' + r.repo
    list.push(
      <li key={'repo-' + i}>
        <Link to={link} styleName='listItem'>
          {r.repo}
        </Link>
      </li>
    )
  })

  return list
}

const Sidebar = props => {
  const favorites = [
    { owner: 'facebook', repo: 'react' },
    { owner: 'd3', repo: 'd3' },
    { owner: 'reactjs', repo: 'redux' },
    { owner: 'redux-saga', repo: 'redux-saga' },
    { owner: 'babel', repo: 'babel' },
    { owner: 'eslint', repo: 'eslint' },
    { owner: 'prettier', repo: 'prettier' },
    { owner: 'microsoft', repo: 'vscode' },
    { owner: 'nodejs', repo: 'node' }
  ]

  return (
    <div>
      <div styleName='container'>
        <h3 styleName='head'>Favorite Repos</h3>
        <ul styleName='list'>{repoList(favorites)}</ul>
      </div>
    </div>
  )
}

export default Sidebar
