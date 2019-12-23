const { addViolation, findOperation } = require('./utils')
const { hasAccountRegistred, hasAccountActive, hasLimit } = require('./account')

const findDoubleTransaction = (operations, operation) => {
  const filtered = operations
  .filter(op => op.transaction)
  .filter(op => {
    const opTime = new Date(op.transaction.time).getTime()
    const operationTime = new Date(operation.transaction.time).getTime()
    const sameAmount = op.transaction.amount == operation.transaction.amount
    const sameMerchant = op.transaction.merchant == operation.transaction.merchant
    const hasMinimunTime = (opTime - operationTime) <= 120000 && (opTime - operationTime) >= 0
    return sameAmount && sameMerchant && hasMinimunTime
  })

  return filtered.length > 1 ? true : false
}

const hasHighFrequency = (state, operation) => findOperation(state.transactionsGroupedTime, operation)

const hasDoubleTransaction = (state, operation) => findDoubleTransaction(state.operations, operation)

const validTransaction = (state, operation) => {

  if (hasHighFrequency(state, operation)) {
    return addViolation(state, 'high-frequency-small-interval')
  }

  if (hasDoubleTransaction(state, operation)) {
    return addViolation(state, 'double-transaction')
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
  findDoubleTransaction
}