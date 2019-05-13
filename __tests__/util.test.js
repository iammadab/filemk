const assert = require("chai").assert

const { 
	existsMock, 
	resolveFilePathMock,
	writeFileMock,
	fileDoesNotExistFnMock,
	fileWriterMock,
	errorHandlerMock
} = require("./mock")

const { makeFiles, fileDoesNotExist, makeFile, pipeline, partial, existsHandler } = require("../lib/util")

describe("Utility Module", () => {


	describe("makeFiles function", () => {

		it("creates the files based on the array of filenames", (done) => {

			let files = []
			makeFiles(fileDoesNotExistFnMock, fileWriterMock(files), errorHandlerMock, ["me.js", "you.js"])
				.then(() => {
					assert.equal(files[0], "me.js")
					assert.equal(files[1], "you.js")
					done()
				})

		})

	})


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




	describe("partial function", () => {

		const add = (a, b) => a + b,
			  product = (a, b, c) => a * b * c

		it("should return undefined if a function is not passed", () => {

			assert.isNull(partial(2))
			assert.isNull(partial("wisd"))
			assert.isNull(partial({ a: 1}))

		})

		it("should return a function only if first arg is a function", () => {

			assert.equal(typeof partial(add, 2), "function")
			assert.equal(typeof partial(a => a), "function")

		})

		it("should prefill a function with the additional arguments", () => {

			let add2 = partial(add, 2), add50 = partial(add, 50), productTest = partial(product, 2, 3)
			assert.equal(add2(5), 7)
			assert.equal(add50(34), 84)
			assert.equal(productTest(4), 24)

		})


	})

	describe("existsHandler function", () => {

		it("does nothing if error code is FILE_EXISTS", () => {

			const error = new Error()
			error.code = "FILE_EXISTS"

			assert.isNotOk(existsHandler(error))

		})

		it("throws an error if passed any other error", () => {

			assert.throws(() => existsHandler(new Error()))

		})

	})


})