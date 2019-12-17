const { addViolation } = require('./utils')
const { hasAccountRegistred } = require('./account')

const validTransaction = (state, operation) => {
  if (hasAccountRegistred(state)) {
    return addViolation(state, 'account-not-initialized')
  }

  return {
    account: {},
    history: []
  }
}

module.exports = {
  validTransaction
}