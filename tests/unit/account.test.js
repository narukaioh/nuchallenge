const {
	registerAccount,
	hasAccountRegistred,
	hasAccountActive,
	hasLimit
} = require("../../src/account")

describe('Account', () => {
	let state
	beforeEach(() => {
		state = {
			account: {},
			operationsHistoric: []
		}
	})

	it('Should check if there is an account registered in the state', () => {
		const result = hasAccountRegistred(state)
		expect(result).toBe(false)
	})

	it('Should verify account is active', () => {
		state.account = { "active-card": true, "available-limit": 120 }
		const result = hasAccountActive(state)
		expect(result).toBe(true)
	})

	it('Should verify account has limit for transaction\'s discount', () => {
		state.account = { "active-card": true, "available-limit": 120 }
		const operation = { "transaction": { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z" } }
		const result = hasLimit(state, operation)
		expect(result).toBe(true)
	})

	it('Should register an account', () => {
		const operation = { account: { "active-card": true, "available-limit": 120 } }
		state = registerAccount(state, operation)
		expect(state.account).toStrictEqual(operation.account)
	})
})