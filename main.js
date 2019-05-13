#! /usr/bin/env node

const { fileDoesNotExist, makeFile } = require("./lib/util")

let [env, src, ...fileList] = process.argv

makeFiles(fileList)











function makeFiles(files){

	files.forEach(file => {
		fileDoesNotExist(file)
			.then(makeFile)
			.catch(handleErrors)


		function handleErrors(error){
			if(error.code == "FILE_EXISTS")
				return
		}
	})

}