const linesToJSList = lines => lines.split("\n").map(line => JSON.parse(line))

module.exports = {
    linesToJSList
}