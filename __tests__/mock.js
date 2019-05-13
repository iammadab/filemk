module.exports = mock = {}

mock.existsMock = (filename) => {
	let files = ["me.js", "you.js"]
	return new Promise((resolve, reject) => {
		if(files.includes(filename.toLowerCase()))
			resolve(filename)
		else
			resolve(false)
	})
}

mock.resolveFilePathMock = (filename) => filename

mock.writeFileMock = (filePath, content) => ({ 
	filePath: filePath,
	content: content
})

mock.fileDoesNotExistFnMock = (filename) => mock.existsMock(mock.resolveFilePathMock(filename))

mock.fileWriterMock = array => filename => { array.push(filename) }

mock.errorHandlerMock = (err) => err