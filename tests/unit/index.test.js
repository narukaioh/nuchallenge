// // import application from "../../src/index"
// const { 
//     linesToJSList,
//     findAccount,
//     authorize,
//     getRule
// } = require("../../src/index")

// describe('', () => {
    
//     it('Deve ler um arquivo de entrada e retornar uma string', () => {

//     })

//     it('Deve transformar linhas da string em lista de objetos JSON', () => {
//         const string = 
//             `{ "a": 1 }
//              { "b": 2 }
//              { "c": 3 }`

//         const result = linesToJSList(string)
//         expect(result).toStrictEqual([ { a: 1 }, { b: 2 }, { c: 3 } ] )
//     })
    
//     /* TODO: Devo assumir que a criacao da conta pode vir em 
//        qualquer linha não necessáriamente a primeira? */
//     it('Deve encontrar a primeira operação de criar conta', () => {
//         const operations = [
//             {"account": {"active-card": true, "available-limit": 100}},
//             {"transaction": {}},
//             {"account": {"active-card": true, "available-limit": 200}}
//         ]

//         const result = findAccount(operations)
//         expect(result).toStrictEqual({"active-card": true, "available-limit": 100})
//     })

//     it('Deve retornar o tipo de regra da operacao', () => {
//         const operation = { account: { a: 0, b: 1 } }
//         const rule = getRule(operation)
//         expect(rule).toBe('account')
//     })

//     // TODO: Se a informacao vier igual ao available-limit em outra ocorrencia
//     it('Deve informar a violacao de contra ja inicializada em opera', () => {
//         const operations = [
//             {"account": {"active-card": true, "available-limit": 100}},
//             {"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z"}},
//             {"account": {"active-card": true, "available-limit": 80}}
//         ]

//         const expected = [
//             {"account": {"active-card": true, "available-limit": 100}, "violations": []},
//             {"account": {"active-card": true, "available-limit": 80}, "violations": []},
//             {"account": {"active-card": true, "available-limit": 80}, "violations": ["account-already-initialized"]}
//         ]

//         const result = authorize(operations)
//         expect(result).toStrictEqual(expected)
//     })

//     it('Deve informar a violacao de limite insuficiente', () => {
//         const operations = [
//             {"account": {"active-card": true, "available-limit": 100}},
//             {"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z"}},
//             {"transaction": {"merchant": "Burger King", "amount": 90, "time": "2019-03-13T10:00:00.000Z"}},
//         ]

//         const expected = [
//             {"account": {"active-card": true, "available-limit": 100}, "violations": []},
//             {"account": {"active-card": true, "available-limit": 80}, "violations": []},
//             {"account": {"active-card": true, "available-limit": 80}, "violations": ["insufficient-limit"]},
//         ]

//         const result = authorize(operations)
//         expect(result).toStrictEqual(expected)
//     })
// })