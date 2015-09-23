# solve-conversion-path

## Install

Via [npm](https://www.npmjs.com/package/solve-conversion-path):

```
npm i solve-conversion-path
```

## Usage

Solve-conversion-path was developed for a js color functions library, but it is not
restricted to operations on color conversion paths.

This conversion/transform path solver expects to be given three things:

1. An array of "converters" with "from" and "to" properties. (eg: `[{ convert() {}, from: 'hsv', to: 'cmyk' }, ...]`)
2. An array of already available "formats". Essentially starting points for the conversion. (eg: `['hex', 'rgb', 'hsl']`)
3. A string representing the desired output "format". (eg: `'cmyk'`)

If the conversion from the available "formats" to the desired output "format" is possible, the function
will return an array with the fewest steps needed to transform one of the already available "formats"
into the desired output. (eg: `[ { from: 'rgb', to: 'hsv' }, { from: 'hsv', to: 'cmyk' } ]`)

It is then simple to transform to the desired "format" using `Array.prototype.reduce`. eg:

```javascript
const color['cmyk'] = conversionPath.reduce(
	(output, converter) => converter.convert(output),
	color[conversionPath[0].from]
);
```

## Example

```javascript
import solveConversionPath from 'solve-conversion-path';

const availableFormats = [ 'lab' ];

const converters = [
	{ convert() {}, from: 'rgb', to: 'hex' },
	{ convert() {}, from: 'hex', to: 'rgb' },
	{ convert() {}, from: 'rgb', to: 'hsl' },
	{ convert() {}, from: 'hsl', to: 'rgb' },
	{ convert() {}, from: 'rgb', to: 'lab' },
	{ convert() {}, from: 'lab', to: 'rgb' },
	{ convert() {}, from: 'cmyk', to: 'hex' },
	{ convert() {}, from: 'hex', to: 'cmyk' },
	{ convert() {}, from: 'hsv', to: 'cmyk' },
	{ convert() {}, from: 'cmyk', to: 'hsv' },
];

console.log(
	'solved:',
	JSON.stringify(
		solveConversionPath(converters, availableFormats, 'hsv'),
		null,
		2
	)
);

/* OUTPUTS in console:
solved: [
  {
    "from": "lab",
    "to": "rgb"
  },
  {
    "from": "rgb",
    "to": "hex"
  },
  {
    "from": "hex",
    "to": "cmyk"
  },
  {
    "from": "cmyk",
    "to": "hsv"
  }
]
*/
```

## License

MIT
