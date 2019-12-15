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
    
    if (isTransaction(getRule(op))) {
      const { transaction } = op
      if (insufficientLimit(account["available-limit"], transaction.amount)) {
        return {
          account: { ...account},
          violations: ["insufficient-limit"]
        }
      }
      account["available-limit"] -= transaction.amount
      return {
        account: { ...account},
        violations: []
      }
    }

    if (accountAlreadyInitialized(account, op.account)) {
      return {
        account: { ...account},
        violations: ['account-already-initialized']
      }
    }

    return {
        account: { ...account},
        violations: []
    }
  })
}
// // cria uma estrutura para manipular
// // const createHistory = operations => { return { account: findAccount(operations), operations } }

// // Verifica se tem credito
// const hasCredit = (x, y) => x <= y
// const isTransationOperation = op => op.account === undefined
// const isAccountRegistrated = (account, currentAccount) => account === currentAccount

// const authorize = (account, operation) => {
//   let violations = []

//   if (isTransationOperation(operation)) {
//     if (hasCredit(account["available-limit"], operation.transaction.amount)) {
//       account["available-limit"] -= operation.transaction.amount 
//     } else if (isAccountRegistrated()) {

//     } else {
//       violations.push('insufficient-limit')
//     }
//   } else {
//     violations.push('account-already-initialized')
//   }

//   return {
//     account: account,
//     violations: violations
//   }
// }

// const makeOutputHistory = operations => {
//   const account = findAccount(operations)
//   return operations.map(operation => authorize(account, operation))
//   // console.log(result)
// }



// const operations = linesToJSList(operationsInString)
// console.log(makeOutputHistory(operations))

// console.log(createHistory(operations))
// console.log(findAccount(linesToJSONList(operationsInString)))

module.exports = {
  linesToJSList,
  findAccount,
  authorize,
  getRule
}
