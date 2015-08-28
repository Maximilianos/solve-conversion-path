/**
 * Given an array of converters with
 * a 'from' and 'to' property and an
 * array of available formats in strings,
 * find the smallest number of convertions
 * of the available formats required, in
 * order to reach the requested format
 *
 * @param {Array} converters
 * @param {Array} availableFormats
 * @param {String} format
 *
 * @returns {Boolean|Array}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = solveConversionPath;

function solveConversionPath(converters, availableFormats, format) {
	if (availableFormats.includes(format)) {
		throw new Error("Format: '" + format + "' already exists in the given available formats");
	}

	/**
  * Step 1. Collect all converters
  * that convert TO the requested
  * format
  *
  * @type {Array}
  */
	var convertersToFormat = converters.filter(function (converter) {
		return converter.to === format;
	});

	if (!convertersToFormat) {
		return false;
	}

	/**
  * Step 2. Check if any of the above
  * converters convert FROM an available
  * format. If we find one, return it!
  *
  * @type {Object|null}
  */
	var converterFromAvailableFormats = convertersToFormat.find(function (converter) {
		return availableFormats.includes(converter.from);
	});

	if (converterFromAvailableFormats) {
		return [converterFromAvailableFormats];
	}

	/**
  * Step 3. Filter the available converters,
  * removing any converters that convert
  * FROM a format that has been evaluated
  * in this function
  *
  * @type {Array}
  */
	var usedConverters = convertersToFormat.map(function (converter) {
		return converter.from;
	}).concat(format);

	var remainingConverters = converters.filter(function (converter) {
		return !usedConverters.includes(converter.from);
	});

	/**
  * Step. 4. Recursively call solveConversionPath
  * on the discovered converters that convert
  * TO the requested format until either a
  * full path is formed, or no path can be formed
  *
  * @type {Array|null}
  */
	var conversionPath = convertersToFormat.map(function (converter) {
		var path = solveConversionPath(remainingConverters, availableFormats, converter.from);
		return path ? path.concat(converter) : false;
	}).find(function (path) {
		return !!path;
	});

	/**
  * Return the discovered path or else return false
  */
	return conversionPath ? conversionPath : false;
}

module.exports = exports["default"];
