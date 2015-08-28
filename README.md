# solve-conversion-path

## Install

```
npm i --save solve-conversion-path
```

## Usage

Solve-conversion-path was developed for a js color functions library, but it is not
restricted to operations on color conversion paths.

This conversion/transform path solver expects to be given three things:

1. An `Array` of "converters" with "from" and "to" properties. (eg: `[{ convert() {}, from: 'hsv', to: 'cmyk' }, ...]`)
2. An `Array` of already available "formats". Essentially starting points for the conversion. (eg: `['hex', 'rgb', 'hsl']`)
3. A `String` representing the desired output "format". (eg: `'cmyk'`)

If the conversion from the available "formats" to the desired output "format" is possible, the function
will return an `Array` with the fewest steps needed to transform one of the already available "formats"
into the desired output. (eg: `[ { from: 'rgb', to: 'hsv' }, { from: 'hsv', to: 'cmyk' } ]`)

It is then simple to transform to the desired "format" using `Array.prototype.reduce`. eg:

```javascript
const color['cmyk'] = conversionPath.reduce(
	(output, converter) => converter.convert(output),
	color[conversionPath.first().from]
);
```

## License

MIT
