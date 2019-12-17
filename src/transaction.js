const { isEmpty } = require('lodash')

const validTransaction = (state, operation) => {
  const violations = []
  if (isEmpty(state.account)) {
    violations.push('account-not-initialized')
    state.history.push({
      account: state.account,
      violations
    })
    return state
  }

  return {
    account: {},
    history: []
  }
}

module.exports = {
  validTransaction
}