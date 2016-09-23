import autoprefixer from 'autoprefixer-core';
import decamelize from 'decamelize';
import fixCase from './fix-case';

function isRule({ type }) {
  return type === 'rule';
}
function isDeclaration({ type }) {
  return type === 'decl';
}

function parseDeclaration({ prop, value }) {
  return {
    key: fixCase(prop),
    value: /^[0-9]+$/.test(value) ? parseInt(value, 10) : value
  };
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
