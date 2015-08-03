import autoprefixer from 'autoprefixer-core';
import camelcase from 'camelcase';
import decamelize from 'decamelize';

function isRule({type}) {
  return type === 'rule';
}
function isDeclaration({type}) {
  return type === 'decl';
}

// If the property is prefixed (i.e., it starts with a hyphen) we have to uppercase the first
// character for React to recognise it properly.
function fixCase(prop) {
  let ret = camelcase(prop);
  return /^-/.test(prop) ? `${ret.charAt(0).toUpperCase()}${ret.substr(1)}` : ret;
}

function parseDeclaration({prop, value}) {
  return {key: fixCase(prop), value};
}
function parseRule({nodes}) {
  return nodes.filter(isDeclaration).map(parseDeclaration);
}

function objectToStyle(object) {
  return Object.keys(object).map(k => `${decamelize(k, '-')}: ${object[k]};`).join('');
}

function cssRule(style) {
  return `* {${style}}`;
}

export default function autoprefix(object) {
  const css = cssRule(objectToStyle(object));

  return autoprefixer.process(css).root.nodes
    .filter(isRule)
    .map(parseRule)
    .reduce((p, c) => p.concat(c), [])
    .reduce((p, c) => {
      if (p.hasOwnProperty(c.key)) {
        Array.isArray(p[c.key]) ? p[c.key].push(c.value) : p[c.key] = [p[c.key], c.value];
      } else {
        p = {...p, [c.key]: c.value};
      }
      return p;
    }, {});
}
