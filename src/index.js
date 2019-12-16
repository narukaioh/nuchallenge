const operationsInString = require('./operations')

const linesToJSList = lines => lines.split("\n").map(line => JSON.parse(line))

const findAccount = operations => operations.filter((op) => op.account).shift().account

const getRule = operation => Object.keys(operation).shift()

const isTransaction = operation => operation === 'transaction'

const insufficientLimit = (availableLimit, transactionAmount) => availableLimit < transactionAmount

const accountAlreadyInitialized = (acc, cur) => acc !== cur

const authorize = operations => {
  let account = findAccount(operations)
  return operations.map(op => {
    const violations = []
    if (isTransaction(getRule(op))) {
      const { transaction } = op
      if (insufficientLimit(account["available-limit"], transaction.amount)) {
        violations.push("insufficient-limit")
      } else {
        account["available-limit"] -= transaction.amount
      }
      return {
        account: { ...account},
        violations
      }
    }

    if (accountAlreadyInitialized(account, op.account)) {
      violations.push('account-already-initialized')
    }

    return {
        account: { ...account},
        violations
    }
  })
}

module.exports = {
  linesToJSList,
  findAccount,
  authorize,
  getRule
}
