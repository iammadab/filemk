#! /usr/bin/env node


const { makeFiles } = require("./lib/util")

let [env, src, ...fileList] = process.argv

makeFiles(fileList)