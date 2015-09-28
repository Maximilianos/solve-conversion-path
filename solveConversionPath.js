/**
 * Given an array of converters with
 * a 'from' and 'to' property and an
 * array of available formats in strings,
 * find the smallest number of conversions
 * of the available formats required, in
 * order to reach the requested format
 *
 * @param {Array} converters
 * @param {Array} availableFormats
 * @param {String} format
 *
 * @returns {Boolean|Array}
 */
export default function solveConversionPath(converters, availableFormats, format) {
	if (availableFormats.includes(format)) {
		throw new Error(`Format: '${format}' already exists in the given available formats`);
	}

	/**
	 * Step 1. Collect all converters
	 * that convert TO the requested
	 * format
	 *
	 * @type {Array}
	 */
	const convertersToFormat = converters
		.filter(converter => converter.to === format);

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
	const converterFromAvailableFormats = convertersToFormat
		.find(converter => availableFormats.includes(converter.from));

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
	const usedConverters = convertersToFormat
		.map(converter => converter.from)
		.concat(format);

	const remainingConverters = converters
		.filter(converter => !usedConverters.includes(converter.from));

	/**
	 * Step. 4. Recursively call solveConversionPath
	 * on the discovered converters that convert
	 * TO the requested format until either a
	 * full path is formed, or no path can be formed
	 *
	 * @type {Array|null}
	 */
	const conversionPath = convertersToFormat
			.map(converter => {
				const path = solveConversionPath(remainingConverters, availableFormats, converter.from);
				return path ? path.concat(converter) : false;
			})
			.find(path => !!path);

	/**
	 * Return the discovered path or else return false
	 */
	return conversionPath ? conversionPath : false;
}
