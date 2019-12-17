const { isEmpty } = require('lodash')
const { validTransaction } = require('./transaction')
const getOperation = operation => Object.keys(operation).shift()

const registerAccount = (state, operation) => {
  const violations = []
  if (!isEmpty(state.account)) {
    violations.push('account-already-initialized')
    state.history.push({
      account: state.account,
      violations
    })

    return state
  }

  state.account = operation.account
  state.history.push({
    account: state.account,
    violations
  })

  return state
}

const authorize = (state, operations) => {
  operations.forEach(operation => {

    switch (getOperation(operation)) {
      case 'account': {
        state = registerAccount(state, operation)
        break;
      }
      case 'transaction': {
        state = validTransaction(state, operation)
        break;
      }
    }
  })

  return state
}

module.exports = {
  authorize
}