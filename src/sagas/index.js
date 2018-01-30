import github from './github'

const root = function * Sagas () {
  yield [github()]
}

export default root
