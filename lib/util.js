const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const exists = promisify(fs.exists), writeFile = promisify(fs.writeFile)

const util = {
	fileDoesNotExist: fileDoesNotExist,
	makeFile: makeFile
}

module.exports = util






















function fileDoesNotExist(filename){
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


