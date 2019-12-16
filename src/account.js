const { isEmpty, zipWith } = require('lodash')

const findAccount = operations => operations.filter((op) => op.account).shift().account

const isAccountCreated = state => state.account !== {}
const isAccount = operation => Object.keys(operation).shift() === 'account'

const authorize = (state, operations) => {
    operations.map(op => {
        const violations = []
        if (!isAccount(op)) {
            return
        }

        if (isEmpty(state.account)) {
            state.account = op.account
        }

        state.output.push({ account: state.account, violations })
    })

    return state
}

module.exports = {
    findAccount,
    isAccountCreated,
    authorize
}