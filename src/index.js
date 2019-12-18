const { validTransaction } = require('./transaction')
const { registerAccount } = require('./account')
const { getOperation } = require('./utils')

const { groupBy } = require('lodash')
const moment = require('moment')

const byDate = (a, b) => new Date(a.time) - new Date(b.time)

const transactionWithExceptions = (operations) => {
  // console.log(operations.filter(operation => operation.transaction).sort(
  //   (a, b) => new Date(a.transaction.time) - new Date(b.transaction.time)
  // ))
  console.log(groupBy(operations.filter(operation => operation.transaction), (operation) => moment(operation.transaction.time).minutes(2)))
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