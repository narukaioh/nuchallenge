
const { authorize } = require("../../src/authorize")

describe('Account Create rules', () => {

  let initialState;
  let operations;

  beforeEach(() => {
    initialState = {
      account: {},
      history: []
    }

    operations = [
      { "account": { "active-card": true, "available-limit": 100 } },
      { "account": { "active-card": true, "available-limit": 200 } }
    ]

  })

  it('Deve registrar uma conta adicionando no state', () => {
    const expected = {'active-card': true, 'available-limit': 100 }
    initialState = authorize(initialState, operations)
    expect(initialState.account).toStrictEqual(expected)
  })

  it('Deve adicionar uma violação: account-already-initiliazated, quando já existir uma account no state', () => {
    const expected = [
      { "account": { "active-card": true, "available-limit": 100 }, violations: [] },
      { "account": { "active-card": true, "available-limit": 100 }, violations: ['account-already-initialized'] },
    ]

    initialState = authorize(initialState, operations)
    expect(initialState.history).toStrictEqual(expected)
  })

})