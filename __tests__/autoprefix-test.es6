import assert from 'assert';
import autoprefix from '../index';
import eq from 'lodash/lang/eq';

const RAW = {
  alignItems: 'center',
  background: 'linear-gradient(350.5deg, white, black), linear-gradient(-130deg, black, white), linear-gradient(45deg, black, white)',
  display: 'flex'
};

const PREFIXED = {
  webkitBoxAlign: 'center',
  webkitAlignItems: 'center',
  msFlexAlign: 'center',
  alignItems: 'center',
  background: ['-webkit-linear-gradient(99.5deg, white, black), -webkit-linear-gradient(220deg, black, white), -webkit-linear-gradient(45deg, black, white)', 'linear-gradient(350.5deg, white, black), linear-gradient(-130deg, black, white), linear-gradient(45deg, black, white)'],
  display: ['-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex']
};

it('autoprefixes an object', () => assert(eq(autoprefix(RAW), PREFIXED)));
