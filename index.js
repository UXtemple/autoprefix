const autoprefixer = require('autoprefixer-core')
const decamelize = require('decamelize')
const fixCase = require('./fix-case')

function isRule({ type }) {
  return type === 'rule'
}
function isDeclaration({ type }) {
  return type === 'decl'
}

function parseDeclaration({ prop, value }) {
  return {
    key: fixCase(prop),
    value: /^[0-9]+$/.test(value) ? parseInt(value, 10) : value
  }
}
function parseRule({nodes}) {
  return nodes.filter(isDeclaration).map(parseDeclaration)
}

function toCssKey(k) {
  let ret = decamelize(k, '-')
  if (/^(Webkit|Moz|ms)/.test(k)) {
    ret = `-${ret}`
  }
  return ret
}

function objectToStyle(object) {
  return Object.keys(object).map(k => `${toCssKey(k)}: ${object[k]};`).join('')
}

function cssRule(style) {
  return `* {${style}}`
}

module.exports = function autoprefix(object) {
  const css = cssRule(objectToStyle(object))

  return autoprefixer.process(css).root.nodes
    .filter(isRule)
    .map(parseRule)
    .reduce((p, c) => p.concat(c), [])
    .reduce((p, c) => {
      if (p.hasOwnProperty(c.key)) {
        Array.isArray(p[c.key]) ? p[c.key].push(c.value) : p[c.key] = [p[c.key], c.value]
      } else {
        p = Object.assign({}, p, {[c.key]: c.value})
      }
      return p
    }, {})
}
