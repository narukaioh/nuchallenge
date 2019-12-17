const { isEmpty } = require('lodash')
const { addViolation } = require('./utils')

const hasAccountRegistred = state => isEmpty(state.account)

const registerAccount = (state, operation) => {
  const violations = []
  if (!hasAccountRegistred(state)) {
    return addViolation(state, 'account-already-initialized')
  }

  state.account = operation.account
  state.history.push({
    account: state.account,
    violations
  })

  return state
}

module.exports = {
  registerAccount,
  hasAccountRegistred
}