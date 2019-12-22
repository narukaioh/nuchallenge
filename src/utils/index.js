const { readFileSync } = require("fs")
const linesToJSList = lines => lines.split("\n").map(line => JSON.parse(line))

const addViolation = (state, violationId) => {
  const violations = []
  violations.push(violationId)
  state.history.push({
    account: state.account,
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

module.exports = {
  linesToJSList,
  addViolation,
  getOperation,
  isEmpty,
  groupBy
}