#!/usr/bin/env node
require('dotenv').config()

const config = require('../src/config')

config
    .init()
    .then(() => {
        console.log(1)
        require('../server').start()
        console.log(2)
    })
    .catch((err) => {
        console.log("hi")
        console.error('Error: ', err)
        process.exit()
    })
