import camelcase from 'camelcase';

// If the property is prefixed (i.e., it starts with a hyphen) we have to uppercase the first
// character for React to recognise it properly.
export default function fixCase(prop) {
  let ret = camelcase(prop);
  return /^-(?!ms)/.test(prop) ? `${ret.charAt(0).toUpperCase()}${ret.substr(1)}` : ret;
}
