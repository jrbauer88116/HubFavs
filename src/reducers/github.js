const initialState = {
  repos: [],
  commits: [],
  token: ''
}

export default function app (state = initialState, action) {
  switch (action.type) {
    case 'STORE_TOKEN':
      return { ...state, token: action.token }
    case 'STORE_REPOS':
      return { ...state, repos: action.repos }
    case 'STORE_COMMITS':
      return { ...state, commits: action.commits }
    default:
      return state
  }
}
