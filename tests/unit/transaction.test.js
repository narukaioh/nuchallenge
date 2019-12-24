const { findDoubleTransaction } = require("../../src/transaction")

describe('Transaction', () => {
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