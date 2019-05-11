const fs = require("fs")
const path = require("path")
const { promisify } = require("util")



const exists = promisify(fs.exists)	
const writeFile = promisify(fs.writeFile)



const util = {}

util.fileExists = fileExists
util.makeFile = makeFile




function fileExists(filename){
	return exists(path.resolve(filename))
}

function makeFile(filename){
	return writeFile(path.resolve(filename), "")
}







module.exports = util