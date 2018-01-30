import React, { Component } from 'react'

import './home.scss'

const Home = class Home extends Component {
  render () {
    return (
      <div styleName='container'>
        <h2>GitHub Favorites</h2>
        <hr />
        <p>
          Seeing as how this is my first project on GitHub, I thought it
          appropriate to highlight some of my favorite GitHub repositories.
        </p>
        <p>
          Upon clicking a repository to the left, you will be presented with a
          line graph detailing the last 100 commits for each project.
        </p>
      </div>
    )
  }
}

export default Home
