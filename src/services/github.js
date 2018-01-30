var config

const honeywell = {
  setConfig (c) {
    config = c
  },

  getConfig () {
    return config
  },

  query (query) {
    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer b7cb1e1520dac2b63dfb971567c4e4da23cc5460'
      },
      body: JSON.stringify(query)
    })
      .then(response => response.json())
      .then(json => {
        return json
      })
  }
}

module.exports = honeywell
