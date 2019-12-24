
const { authorize } = require("../../src/authorize")

describe('Account Create rules', () => {

  let initialState;
  let operations;

  beforeEach(() => {
    initialState = {
      account: {},
      operationsHistoric: []
    }

    operations = [
      { "account": { "active-card": true, "available-limit": 100 } },
      { "account": { "active-card": true, "available-limit": 200 } }
    ]

  })

  it('Should register an account by adding in state', () => {
    const expected = {'active-card': true, 'available-limit': 100 }
    initialState = authorize(initialState, operations)
    expect(initialState.account).toStrictEqual(expected)
  })

  it('The account should not be updated or recreated: `account-already-initialized`', () => {
    const expected = [
      { "account": { "active-card": true, "available-limit": 100 }, violations: [] },
      { "account": { "active-card": true, "available-limit": 100 }, violations: ['account-already-initialized'] },
    ]

    initialState = authorize(initialState, operations)
    expect(initialState.operationsHistoric).toStrictEqual(expected)
  })

})