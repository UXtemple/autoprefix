import autoprefixer from 'autoprefixer-core';
import camelcase from 'camelcase';
import cssparse from 'css-parse';
import decamelize from 'decamelize';

function isRule({type}) {
  return type === 'rule';
}
function isDeclaration({type}) {
  return type === 'declaration';
}

function parseDeclaration({property, value}) {
  return {key: camelcase(property), value};
}
function parseRule({declarations}) {
  return declarations.filter(isDeclaration).map(parseDeclaration);
}

function objectToStyle(object) {
  return Object.keys(object).map(k => `${decamelize(k, '-')}: ${object[k]};`).join('');
}

function cssRule(style) {
  return `* {${style}}`;
}

export default function autoprefix(object) {
  const css = cssRule(objectToStyle(object));

  return cssparse(autoprefixer.process(css).css).stylesheet.rules
    .filter(isRule)
    .map(parseRule)
    .reduce((p, c) => p.concat(c), [])
    .reduce((p, c) => {
      if (p.hasOwnProperty(c.key)) {
        p[c.key] = Array.isArray(p[c.key]) ? p[c.key].push(c.value) : [p[c.key], c.value];
      } else {
        p = {...p, [c.key]: c.value};
      }
      return p;
    }, {});
}
