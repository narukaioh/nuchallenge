
const createOperationList = lines => lines.split("\n").map(line => JSON.parse(line))

const byDate = (a, b) => new Date(a.transaction.time) - new Date(b.transaction.time)

const addViolation = (state, violationId) => {
  const violations = []
  violations.push(violationId)
  state.operationsHistoric.push({
    account: { ...state.account },
    violations
  })

  return state
}

const isEmpty = object => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

const getOperation = operation => Object.keys(operation).shift()

const groupBy = (array, callback) => {
  return array.reduce((acc, item) => {
    var list = callback(item)
    acc[list] = acc[list] || []
    acc[list].push(item)
    return acc
  }, {})
}

const getTime = timestamp => new Date(timestamp).getTime()

const getMinimumTime = (timeX, timeY) => {
  const result = getTime(timeX) - getTime(timeY)
  return (result <= 120000 && result >= -120000) ? true : false
}

const findDoubleTransaction = (operations, operation) => {

  const filtered = operations
    .filter(op => op.transaction)
    .filter(op => {
      return getMinimumTime(op.transaction.time, operation.transaction.time) &&
        op.transaction.amount === operation.transaction.amount &&
        op.transaction.merchant === operation.transaction.merchant
    })

  return filtered.length > 1 ? true : false
}

const findOperation = (transactions, operation, ) => {
  let label
  let time = getTime(operation.transaction.time)

  for (key in transactions) {
    label = getTime(key)
    if (transactions[key].length > 3 && getMinimumTime(time, label)) {
      return true
    }
  }

  return false
}

module.exports = {
  createOperationList,
  addViolation,
  getOperation,
  findOperation,
  isEmpty,
  groupBy,
  byDate,
  findDoubleTransaction
}