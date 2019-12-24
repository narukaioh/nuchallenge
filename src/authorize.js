const { validTransaction, getTransactionsGroupedTime } = require('./transaction')
const { registerAccount } = require('./account')
const { getOperation } = require('./utils')

const authorize = (state, operations) => {
  state.operations = operations
  operations.forEach(operation => {

    switch (getOperation(operation)) {
      case 'account': {
        state = registerAccount(state, operation)
        break;
      }
      case 'transaction': {
        state = getTransactionsGroupedTime(state)
        state = validTransaction(state, operation)
        break;
      }
    }
  })

  return state
}

module.exports = {
  authorize,
  getTransactionsGroupedTime
}