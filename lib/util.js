const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const exists = promisify(fs.exists), writeFile = promisify(fs.writeFile)

const util = {
	makeFiles: makeFiles,
	fileDoesNotExist: fileDoesNotExist,
	makeFile: makeFile,
	pipeline: pipeline,
	partial: partial		
}

module.exports = util



















function makeFiles(files){

	files.forEach(file => {
		fileDoesNotExist(exists, path.resolve, file)
			.then(partial(makeFile, writeFile, path.resolve))
			.catch(handleErrors)


		function handleErrors(error){
			if(error.code == "FILE_EXISTS")
				return
		}
	})

}

function fileDoesNotExist(existsFn, resolveFilePath, filename){
	return existsFn(resolveFilePath(filename))
				.then(handleExists)

	function handleExists(exists){
		if(exists) throw createError("FILE_EXISTS")
		return filename

	}
}

function makeFile(writeFunction, resolveFilePath, filename){
	return writeFunction(resolveFilePath(filename), "")
}

function pipeline(...fns){
	return input => fns.reduce((acc, fn) => fn(acc), input)
}

function partial(fn, ...args){
	if(typeof fn != "function") return null
	return input => fn(...args, input)
}

function createError(errorCode){
	const error = new Error()
		  error.code = errorCode
    return error
}


