import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Home from 'components/Home'
import Repo from '../components/Repo'

class Routes extends Component {
  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Repo} />
          <Route path='/repo' component={Repo} />
        </Switch>
      </main>
    )
  }
}

export default withRouter(Routes)

// export default withRouter(connect(mapStateToProps)(Routes))
