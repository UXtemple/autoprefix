import autoprefix from '../index';
import test from 'tape';

const RAW = {
  alignItems: 'center',
  background: 'linear-gradient(350.5deg, white, black), linear-gradient(-130deg, black, white), linear-gradient(45deg, black, white)',
  display: 'flex'
};

const PREFIXED = {
  WebkitBoxAlign: 'center',
  WebkitAlignItems: 'center',
  MsFlexAlign: 'center',
  alignItems: 'center',
  background: ['-webkit-linear-gradient(99.5deg, white, black), -webkit-linear-gradient(220deg, black, white), -webkit-linear-gradient(45deg, black, white)', 'linear-gradient(350.5deg, white, black), linear-gradient(-130deg, black, white), linear-gradient(45deg, black, white)'],
  display: ['-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex']
};

test('autoprefixes an object', t => {
  t.deepEqual(autoprefix(RAW), PREFIXED);
  t.end();
});
