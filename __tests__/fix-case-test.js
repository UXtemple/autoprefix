// https://facebook.github.io/react/tips/inline-styles.html
const fixCase = require('../fix-case')
const test = require('tape')

const TEST = {
  '-ms-transition': 'msTransition',
  '-moz-transition': 'MozTransition',
  '-webkit-transition': 'WebkitTransition'
}

for (let key in TEST) {
  test(key, t => {
    t.ok(fixCase(key) === TEST[key], key)
    t.end()
  })
}
