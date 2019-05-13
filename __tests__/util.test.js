const assert = require("chai").assert

const { 
	existsMock, 
	resolveFilePathMock,
	writeFileMock
} = require("./mock")

const { fileDoesNotExist, makeFile, pipeline } = require("../lib/util")

describe("Utility Module", () => {





	describe("fileDoesNotExist function", () => {

		it("Returns the filename if file does not exists", (done) => {

			fileDoesNotExist(existsMock, resolveFilePathMock, "randomfile.js")
				.then((filename) => {
					assert.equal(filename, "randomfile.js")
					done()
				})

		})

		it("Throws an error if the filename exists", (done) => {

			fileDoesNotExist(existsMock, resolveFilePathMock, "you.js")
				.then(() => { throw new Error() })
				.catch((err) => {
					assert.equal(err.code, "FILE_EXISTS")
					done()
				})

		})

	})





	describe("makeFile function", () => {

		it("Writes an empty string to the file", () => {

			let result1 = makeFile(writeFileMock, resolveFilePathMock, "testFile.html"),
				result2 = makeFile(writeFileMock, resolveFilePathMock, "me.txt")

			assert.equal(result1.content, "")
			assert.equal(result2.content, "")

		})

		it("writes to the correct file", () => {

			let result1 = makeFile(writeFileMock, resolveFilePathMock, "testFile.html"),
				result2 = makeFile(writeFileMock, resolveFilePathMock, "me.txt")

			assert.equal(result1.filePath, "testFile.html")
			assert.equal(result2.filePath, "me.txt")

		})

	})





	describe("pipeline function", () => {

		const double = a => a * 2,
			  triple = a => a * 3

		it("returns a function", () => {

			let chain = pipeline(double, triple)

			assert.equal(typeof chain, "function")

		})

		it("returns a function that spits back the input if no argument is passed", () => {

			let chain = pipeline()

			assert.equal(chain("wisdom"), "wisdom")

		})

		it("It pipes its input to all its composed functions", () => {

			let chain = pipeline(double, triple),
				chain2 = pipeline(triple, double)

			assert.equal(chain(2), 12)
			assert.equal(chain(5), 30)

		})

	})


})