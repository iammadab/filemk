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
				.then(handleExists)

	function handleExists(exists){
		if(exists)
			throw createError("FILE_EXISTS")
		return filename
	}
}

function makeFile(filename){
	return writeFile(path.resolve(filename), "")
}

function createError(errorCode){
	const error = new Error()
	error.code = errorCode
	return error
}



module.exports = util