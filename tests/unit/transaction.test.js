const { authorize, getForbiddenTransactions } = require('../../src/authorize')
const { findDoubleTransaction } = require("../../src/transaction")
const { findOperation } = require('../../src/utils')

describe('Transaction rules', () => {
  let initialState;
  let operations;

  beforeEach(() => {
    initialState = {
      account: {},
      history: [],
      forbidden: [],
      operations: []
    }

    operations = [
      { "transaction": { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z" } },
      { "account": { "active-card": true, "available-limit": 100 } }
    ]

  })

  it('Nao deve aceitar a transacao se a conta nao foi inicializada: `account-not-initialized`', () => {
    const expected = [
      { account: {}, violations: ['account-not-initialized']},
      { account: { "active-card": true, "available-limit": 100 }, violations: []}
    ]
    initialState = authorize(initialState, operations)
    expect(initialState.history).toStrictEqual(expected)
  })

  it('Nao deve aceitar a transacao se a conta nao estiver ativa: `card-not-active`', () => {
    
    let state = {
      account: { "active-card": false, "available-limit": 300 },
      history: []
    }

    const expected = [
      { account: {"active-card": false, "available-limit": 300 }, violations: ['card-not-active']},
      { account: {"active-card": false, "available-limit": 300 }, violations: ['account-already-initialized']}
    ]
    state = authorize(state, operations)
    expect(state.history).toStrictEqual(expected)
  })

  it('Nao deve fazer uma transacao se o limite for excedido: `insufficient-limit`', () => {

    const op = [
      { "account": {"active-card": true, "available-limit": 120 } },
      { "transaction": { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z" } },
      { "transaction": { "merchant": "McDonald", "amount": 180, "time": "2019-02-09T10:00:00.000Z" } },
    ]

    const expected = [
      { account: {"active-card": true, "available-limit": 120 }, violations: []},
      { account: {"active-card": true, "available-limit": 100 }, violations: []},
      { account: {"active-card": true, "available-limit": 100 }, violations: ['insufficient-limit']},
    ]

    initialState = authorize(initialState, op)
    expect(initialState.history).toStrictEqual(expected)
  })

  it('Nao deve ter mais de 3 transacoes em menos de 2 minutos', () => {
    const ops = [
      { account: {"active-card": true, "available-limit": 120 }, violations: []},
      { "transaction": { "merchant": "a", "amount": 180, "time": "2019-02-13T10:01:36.000Z" } },
      { "transaction": { "merchant": "b", "amount": 180, "time": "2019-02-13T10:02:00.000Z" } },
      { "transaction": { "merchant": "c", "amount": 180, "time": "2019-02-13T10:02:06.000Z" } },
      { "transaction": { "merchant": "d", "amount":  30, "time": "2019-02-14T10:04:35.000Z" } },
      { "transaction": { "merchant": "e", "amount": 180, "time": "2019-02-13T10:02:15.000Z" } },
      { "transaction": { "merchant": "f", "amount": 180, "time": "2019-02-13T10:09:40.000Z" } },
      { "transaction": { "merchant": "g", "amount": 180, "time": "2019-02-13T10:01:35.000Z" } },
      { "transaction": { "merchant": "h", "amount": 180, "time": "2019-02-13T10:06:00.000Z" } },
      { "transaction": { "merchant": "i", "amount": 180, "time": "2019-02-13T10:02:01.000Z" } },
    ]

    const expected = [
      { account: {"active-card": true, "available-limit": 120 }, violations: []},
      { account: {"active-card": true, "available-limit": 120 }, violations: ['high-frequency-small-interval']},
      { account: {"active-card": true, "available-limit": 120 }, violations: ['high-frequency-small-interval']},
      { account: {"active-card": true, "available-limit": 120 }, violations: ['high-frequency-small-interval']},
      { account: {"active-card": true, "available-limit":  90 }, violations: []},
      { account: {"active-card": true, "available-limit":  90 }, violations: ['high-frequency-small-interval']},
      { account: {"active-card": true, "available-limit":  90 }, violations: ['insufficient-limit']},
      { account: {"active-card": true, "available-limit":  90 }, violations: ['high-frequency-small-interval']},
      { account: {"active-card": true, "available-limit":  90 }, violations: ['insufficient-limit']},
      { account: {"active-card": true, "available-limit":  90 }, violations: ['high-frequency-small-interval']}
    ]

    initialState = authorize(initialState, ops)
    expect(initialState.history).toStrictEqual(expected)

  })

  it('Deve encontrar uma transação dentro da lista de transações proibidas', () => {
    initialState.forbidden = {
      'Wed Feb 13 2019 08:03:35 GMT-0200 (Brasilia Summer Time)': [
        { transaction: { "merchant": "a", "amount": 180, "time": "2019-02-13T10:01:36.000Z" } },
        { transaction: { "merchant": "b", "amount": 180, "time": "2019-02-13T10:01:37.000Z" } },
        { transaction: { "merchant": "c", "amount": 180, "time": "2019-02-13T10:01:38.000Z" } },
        { transaction: { "merchant": "d", "amount": 180, "time": "2019-02-13T10:01:39.000Z" } },
      ]
    }

    const operation = { transaction: { "merchant": "a", "amount": 180, "time": "2019-02-13T10:01:36.000Z" } }

    const result = findOperation(initialState.forbidden, operation)

    expect(result).toBe(true)

  })

  it('Nao deve ter mais de uma transação do mesmo merchant e amount em menos de 2 minutos: `double-transaction`', () => {
    
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