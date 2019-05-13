#! /usr/bin/env node

const { makeFilesFn } = require("./lib/util")

let [env, src, ...fileList] = process.argv

makeFilesFn(fileList)