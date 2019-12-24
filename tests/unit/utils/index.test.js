const { createOperationList, findOperation } = require('../../../src/utils')

describe('Utils unit tests', () => {

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
})