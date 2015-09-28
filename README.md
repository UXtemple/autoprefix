# autoprefix

Adds vendor prefixes to an object of styles through
[autoprefixer](https://github.com/postcss/autoprefixer).

Works best in combination with
[react-autoprefix](https://github.com/UXtemple/babel-plugin-react-autoprefix)
babel plugin to auto prefix your inline styles at compilation time :).

[![Build Status](https://travis-ci.org/UXtemple/autoprefix.svg)](https://travis-ci.org/UXtemple/autoprefix)

## Installation

```sh
$ npm install autoprefix
```

## Usage

```javascript
require('autoprefix')({
  alignItems: 'center',
  background: 'linear-gradient(350.5deg, white, black), linear-gradient(-130deg, black, white), linear-gradient(45deg, black, white)'
});

// =>
//
// {
//   webkitBoxAlign: 'center',
//   webkitAlignItems: 'center',
//   msFlexAlign: 'center',
//   alignItems: 'center',
//   background: ['-webkit-linear-gradient(99.5deg, white, black), -webkit-linear-gradient(220deg, black, white), -webkit-linear-gradient(45deg, black, white)', 'linear-gradient(350.5deg, white, black), linear-gradient(-130deg, black, white), linear-gradient(45deg, black, white)']
// }
```

Initially inspired by [react-css](https://github.com/elierotenberg/react-css).

Locked to a synchronous version of autoprefixer to allow for the babel plugin for react.
