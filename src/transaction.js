const { addViolation, findOperation, findDoubleTransaction, groupBy, isEmpty, byDate } = require('./utils')
const { hasAccountRegistred, hasAccountActive, hasLimit } = require('./account')

const hasHighFrequency = (state, operation) => findOperation(state.transactionsGroupedTime, operation) 

const hasDoubleTransaction = (state, operation) => findDoubleTransaction(state.operations, operation)

const getTransactionsGroupedTime = (state) => {
  const { operations } = state
  if (isEmpty(state.transactionsGroupedTime)) {
    const sortedDate = operations
      .filter(operation => operation.transaction)
      .sort(byDate)
    let groupTime = null

    state.transactionsGroupedTime = groupBy(sortedDate, operation => {
      const time = new Date(operation.transaction.time)
      if (!groupTime) groupTime = new Date(time.getTime() + 2 * 60000)
      return time - groupTime <= 120000 ? groupTime : groupTime = time
    })
  }

  return state 
}

const validTransaction = (state, operation) => {

  if (hasDoubleTransaction(state, operation)) {
    return addViolation(state, 'double-transaction')
  }

  if (hasHighFrequency(state, operation)) {
    return addViolation(state, 'high-frequency-small-interval')
  }

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
  state.operationsHistoric.push({
    account: { ...state.account },
    violations: []
  })

  return state
}

module.exports = {
  validTransaction,
  getTransactionsGroupedTime
}