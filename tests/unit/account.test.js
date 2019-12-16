
const { findAccount, isAccountCreated, authorize } = require("../../src/account")

describe('Account Create', () => {

  let initialState = {
    account: {},
    output: []
  }

  const operations = [
    { },
    { "account": { "active-card": true, "available-limit": 100 } },
    { },
    { "account": { "active-card": true, "available-limit": 200 } }
  ]

  it('Deve registrar uma conta adicionando no state', () => {
    const expected = {'active-card': true, 'available-limit': 100 }

    initialState = authorize(initialState, operations)

    expect(initialState.account).toStrictEqual(expected)
  
  })

  // it('Deve adicionar uma violação: account-already-initilizated, quando já existir uma account no state', () => {

  // })
  
  // it('Deve verificar se uma conta ja foi registrada', () => {
  //   expect(isAccountCreated(initialState)).toBe(true)
  // })

  // it('Deve adicionar a violacao account-already-initialized', () => {
  //   const expectedState = {
  //     registred: { account: { "active-card": true, "available-limit": 100 }},
  //     operations: [
  //       { "account": { "active-card": true, "available-limit": 100 }, violations: [] },
  //       { "account": { "active-card": true, "available-limit": 100 }, violations: ['account-already-initialized'] },
  //     ]
  //   }
  //   initialState.operations = authorize(initialState, operations)
  //   expect(initialState).toStrictEqual(expectedState)
  // })

})