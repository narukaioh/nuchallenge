const { addViolation, isEmpty } = require('./utils')

const hasAccountRegistred = state => !isEmpty(state.account)

const hasAccountActive = state => state.account['active-card']

const hasLimit = (state, operation) => state.account['available-limit'] > operation.transaction.amount

const registerAccount = (state, operation) => {
  const violations = []
  if (hasAccountRegistred(state)) {
    return addViolation(state, 'account-already-initialized')
  }

  state.account = operation.account
  state.operationsHistoric.push({
    account: { ...state.account },
    violations
  })

  return state
}

module.exports = {
  registerAccount,
  hasAccountRegistred,
  hasAccountActive,
  hasLimit
}