# autoprefixer

Adds vendor prefixes to an object of styles through autoprefixer

## Installation

```sh
$ npm install autoprefixer
```

## Usage

```javascript
require('autoprefixer')({
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
