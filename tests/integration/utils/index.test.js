const { createOperationList } = require('../../../src/utils')

describe('Utils', () => {

    it('Deve transformar linhas da string em lista de objetos JSON', () => {
        const string = 
            `{ "a": 1 }
             { "b": 2 }
             { "c": 3 }`

        const result = createOperationList(string)
        expect(result).toStrictEqual([ { a: 1 }, { b: 2 }, { c: 3 } ] )
    })
})