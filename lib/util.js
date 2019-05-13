const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const exists = promisify(fs.exists), writeFile = promisify(fs.writeFile)

const util = {
	makeFilesFn: partial(makeFiles, partial(fileDoesNotExist, exists, path.resolve), partial(makeFile, writeFile, path.resolve), existsHandler),
	makeFiles: makeFiles,
	fileDoesNotExist: fileDoesNotExist,
	makeFile: makeFile,
	pipeline: pipeline,
	partial: partial,
	existsHandler: existsHandler
}

module.exports = util



















function makeFiles(fileDoesNotExistFn, fileWriter, errorHandler, files){

	return new Promise((resolve, reject) => {
		files.forEach(file => {
			fileDoesNotExistFn(file)
				.then(fileWriter)
				.then(resolve)
				.catch(errorHandler)
		})
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

function existsHandler(err){
	if(err.code == "FILE_EXISTS")
		return
	else
		throw err
}