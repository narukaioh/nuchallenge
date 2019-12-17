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

const getOperation = operation => Object.keys(operation).shift()

module.exports = {
  linesToJSList,
  addViolation,
  getOperation
}