#! /usr/bin/env node

const { fileExists, makeFile } = require("./lib/util")

let args = process.argv, [a, b, ...files] = args

files.forEach(file => {
	fileExists(file)
		.then(makeFile)
		.catch(handleErrors)


	function handleErrors(error){
		if(error.code == "FILE_EXISTS")
			return
	}
})