#! /usr/bin/env node

const { fileDoesNotExist, makeFile } = require("./lib/util")

let args = process.argv, [a, b, ...files] = args

files.forEach(file => {
	fileDoesNotExist(file)
		.then(makeFile)
		.catch(handleErrors)


	function handleErrors(error){
		if(error.code == "FILE_EXISTS")
			return
	}
})