const { authorize } = require("./authorize")
const { createOperationList } = require("./utils")
const { readFileSync } = require("fs")
const state = require("./store/initialState")

const file = process.argv[2]

const string = readFileSync(file, "utf8")
const operations = createOperationList(string)

console.log(authorize(state, operations).history)