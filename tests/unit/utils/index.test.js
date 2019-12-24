const {
  createOperationList,
  addViolation,
  getOperation,
  findOperation,
  isEmpty,
  groupBy,
  byDate,
  findDoubleTransaction
} = require('../../../src/utils')

describe('Utils unit tests', () => {

  it('Should return true if the value is empty', () => {
    const test1 = "";
    const result = isEmpty(test1)
    const test2 = "s"
    const result2 = isEmpty(test2)
    expect(result).toBe(true)
    expect(result2).toBe(false)
  })

  it('Should add a violation in state', () => {
    let state = {
      account: {},
      operationsHistoric: []
    }

    const expected = {
      account: {},
      operationsHistoric: [
        { account: {}, violations: ['violation-test']}
      ]
    }

    state = addViolation(state, 'violation-test')
    expect(state).toStrictEqual(expected)
  })

  it('Should return operation\'s type', () => {
    const operations = [
      { account: {} },
      { transaction: {} },
      { otherType: {}}
    ]

    const expected = ['account', 'transaction', 'otherType']
    const result = operations.map(operation => getOperation(operation))
    expect(result).toEqual(expected)
  })

  it('Should return the diference of transaction\'s time', () => {
    const op1 = { transaction: { "merchant": "a", "amount": 180, "time": "2019-02-13T10:01:36.000Z" } }
    const op2 = { transaction: { "merchant": "b", "amount": 100, "time": "2019-02-13T10:01:37.000Z" } }
    const result = byDate(op1, op2)
    expect(result).toBe(-1000)
  })

  it('Should group lists by a defined pattern', () => {
    const operations = [
      { account: { limit: 100, active: true } },
      { account: { limit: 30, active: true } },
      { transaction: { merchant: 100, amount: 40 } }
    ]
    const expected = {
      account: [
        { account: { limit: 100, active: true } },
        { account: { limit: 30, active: true } }
      ],
      transaction: [
        { transaction: { merchant: 100, amount: 40 } }
      ]
    }
    const result = groupBy(operations, op => {
      return getOperation(op)
    })
    expect(result).toStrictEqual(expected)
  })

  it('Should transform string lines into JSON object list', () => {
    const string = `{ "a": 1 }\n{ "b": 2 }\n{ "c": 3 }`
    const result = createOperationList(string)
    expect(result).toStrictEqual([{ a: 1 }, { b: 2 }, { c: 3 }])
  })

  it('Should return true when finding an operation within a list', () => {
    const transactionsGroupedTime = {
      'Wed Feb 13 2019 08:03:35 GMT-0200 (Brasilia Summer Time)': [
        { transaction: { "merchant": "a", "amount": 180, "time": "2019-02-13T10:01:36.000Z" } },
        { transaction: { "merchant": "b", "amount": 180, "time": "2019-02-13T10:01:37.000Z" } },
        { transaction: { "merchant": "c", "amount": 180, "time": "2019-02-13T10:01:38.000Z" } },
        { transaction: { "merchant": "d", "amount": 180, "time": "2019-02-13T10:01:39.000Z" } },
      ]
    }

    const operation = { transaction: { "merchant": "a", "amount": 180, "time": "2019-02-13T10:01:36.000Z" } }

    const result = findOperation(transactionsGroupedTime, operation)

    expect(result).toBe(true)

  })

  it('Should return true when finding a folded transaction within 2 minutes', () => {

    const ops = [
      { transaction: { "merchant": "a", "amount": 30, "time": "2019-02-13T10:01:36.000Z" } },
      { transaction: { "merchant": "a", "amount": 30, "time": "2019-02-13T10:01:37.000Z" } },
      { transaction: { "merchant": "a", "amount": 30, "time": "2019-02-13T10:05:37.000Z" } },
    ]

    const operation = { transaction: { "merchant": "a", "amount": 30, "time": "2019-02-13T10:01:36.000Z" } }
    const result = findDoubleTransaction(ops, operation)
    expect(result).toBe(true)

  })
})