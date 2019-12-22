const { validTransaction } = require('./transaction')
const { registerAccount } = require('./account')
const { getOperation, groupBy } = require('./utils')

const byDate = (a, b) => new Date(a.transaction.time) - new Date(b.transaction.time)

const transactionWithExceptions = (operations) => {

  const sortedDate = operations
    .filter(operation => operation.transaction)
    .sort(byDate)

  let groupTime = null
  const result = groupBy(sortedDate, operation => {
    const time = new Date(operation.transaction.time)
    if (!groupTime) groupTime = new Date(time.getTime() + 2 * 60000)
    return time - groupTime <= 120000 ? groupTime : groupTime = time
  });

  console.log(result);
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
  authorize,
  transactionWithExceptions
}