const { authorize } = require('../../src')

describe('Transaction rules', () => {
  let initialState;
  let operations;

  beforeEach(() => {
    initialState = {
      account: {},
      history: []
    }

    operations = [
      { "transaction": { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z" } },
      { "account": { "active-card": true, "available-limit": 100 } }
    ]

  })
  // No transaction should be accepted without a properly initialized account: `account-not-initialized
  it('Nao deve aceitar a transacao se a conta nao foi inicializada: `account-not-initialized`', () => {
    const expected = [
      { account: {}, violations: ['account-not-initialized']},
      { account: { "active-card": true, "available-limit": 100 }, violations: []}
    ]
    initialState = authorize(initialState, operations)
    expect(initialState.history).toStrictEqual(expected)
  })

  it('', () => {

  })
})