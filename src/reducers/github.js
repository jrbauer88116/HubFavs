const initialState = {
  repos: [],
  commits: []
}

export default function app (state = initialState, action) {
  switch (action.type) {
    case 'STORE_REPOS':
      return { ...state, repos: action.repos }
    case 'STORE_COMMITS':
      return { ...state, commits: action.commits }
    default:
      return state
  }
}
