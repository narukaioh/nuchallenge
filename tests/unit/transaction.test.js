const {
  validTransaction,
  getTransactionsGroupedTime
} = require("../../src/transaction")

describe('Transaction', () => {

  let state = {
    account: {"active-card": true, "available-limit": 100},
    operations: [
      {"account": {"active-card": true, "available-limit": 100}},
      {"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z"}},
      {"transaction": {"merchant": "Habbib's", "amount": 90, "time": "2019-02-13T11:00:00.000Z"}},
      {"account": {"active-card": true, "available-limit": 380}}
    ],
    operationsHistoric: [],
    transactionsGroupedTime: []
  }

  it('Should grouped transactions by 2 minutes', () => {
    state = getTransactionsGroupedTime(state)
    const expected = {
      "Wed Feb 13 2019 08:02:00 GMT-0200 (Brasilia Summer Time)": [
        {"transaction": {"amount": 20, "merchant": "Burger King", "time": "2019-02-13T10:00:00.000Z"}}
      ], 
      "Wed Feb 13 2019 09:00:00 GMT-0200 (Brasilia Summer Time)": [
        {"transaction": {"amount": 90, "merchant": "Habbib's", "time": "2019-02-13T11:00:00.000Z"}}
      ]
    }

    expect(state.transactionsGroupedTime).toStrictEqual(expected)
  })

  it('Should check whether a transaction has violations or not', () => {
    const operation = {"transaction": {"amount": 20, "merchant": "Burger King", "time": "2019-02-13T10:00:00.000Z"}}
    state = validTransaction(state, operation)
    const expected = [
      { account: { "active-card": true, "available-limit": 80 }, violations: [] }
    ]
    expect(state.operationsHistoric).toStrictEqual(expected)

  })
})