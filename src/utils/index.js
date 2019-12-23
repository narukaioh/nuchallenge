
const createOperationList = lines => lines.split("\n").map(line => JSON.parse(line))

const addViolation = (state, violationId) => {
  const violations = []
  violations.push(violationId)
  state.operationsHistoric.push({
    account: { ...state.account},
    violations
  })

  return state
}

const isEmpty = object => {
  for(const key in object) {
      if(object.hasOwnProperty(key))
          return false
  }
  return true
}

const getOperation = operation => Object.keys(operation).shift()

const groupBy = (array, callback ) => {
  return array.reduce((acc, item) => {
    var list = callback(item)
    acc[list] = acc[list] || []
    acc[list].push(item)
    return acc
  }, {})
}

const findOperation = (list, operation) => {
  let listKeyTime;
  let time = new Date(operation.transaction.time).getTime()

  for (key in list) {
    listKeyTime = new Date(key).getTime()
    if (list[key].length > 3 && (listKeyTime - time) <= 120000 && (listKeyTime - time) > 0) {
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
  groupBy
}