const { addViolation } = require('./utils')
const { hasAccountRegistred, hasAccountActive, hasLimit } = require('./account')

const validTransaction = (state, operation) => {
  if (!hasAccountRegistred(state)) {
    return addViolation(state, 'account-not-initialized')
  }

  if (!hasAccountActive(state)) {
    return addViolation(state, 'card-not-active')
  }

  if (!hasLimit(state, operation)) {
    return addViolation(state, 'insufficient-limit')
  }

  state.account['available-limit'] -= operation.transaction.amount
  state.history.push({
    account: { ...state.account },
    violations: []
  })

  return state
}

module.exports = {
  validTransaction
}