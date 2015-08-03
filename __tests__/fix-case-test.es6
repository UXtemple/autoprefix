// https://facebook.github.io/react/tips/inline-styles.html
import fixCase from '../fix-case';
import test from 'tape';

const TEST = {
  '-ms-transition': 'msTransition',
  '-moz-transition': 'MozTransition',
  '-webkit-transition': 'WebkitTransition'
};

for (let key in TEST) {
  test(key, t => {
    t.ok(fixCase(key) === TEST[key], key);
    t.end();
  });
}
