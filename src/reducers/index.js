import { combineReducers } from 'redux'

import app from './appReducer'
import gitHub from './github'

export default combineReducers({
  app,
  gitHub
})
