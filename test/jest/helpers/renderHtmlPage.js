/**
 * This file renders the index page to use in test files
 */

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync('./src/index.html', 'utf8')
jest.dontMock('fs')

beforeEach(() => {
  document.documentElement.innerHTML = html.toString()
})

afterEach(() => {
  jest.resetModules()
})