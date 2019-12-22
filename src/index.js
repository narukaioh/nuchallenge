const { authorize } = require("./authorize")
const { linesToJSList } = require("./utils")
const { readFileSync } = require("fs")
const state = require("./store/initialState")

const file = process.argv[2]

const string = readFileSync(file, "utf8")
const operations = linesToJSList(string)

console.log(authorize(state, operations).history)