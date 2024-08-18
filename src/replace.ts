/**
 * A tuple representing a pattern and replacement string, where the pattern is a string or regex.
 */
export type ReplaceTuple = [string | RegExp, string];

/**
 * An array of replace tuples.
 */
export type ReplaceTuples = Array<ReplaceTuple>;

/**
 * The sentinel value used to split the pattern and replacement in the replace option.
 */
export const replaceSentinel = ":=>";

/**
 * Parse the replace option value and return an array of replace tuples.
 * The replace option value is a list of tuples of the form [pattern, replacement].
 * Like `String.prototype.replace`, the pattern is a string or regex, and the replacement is a string.
 * If you want to use a regex pattern, you must use the format `/pattern/`.
 *
 * The pattern and replacement are split by the `replaceSentinel` value.
 */
function parseReplaceOption(value: string, acc: ReplaceTuples): ReplaceTuples {
	// split the pattern and replacement by the sentinel value
	const parts = value.split(replaceSentinel);

	// check for invalid pattern and replacement
	if (parts.length !== 2) {
		return acc;
	}

	const pattern = parts.at(0)?.trim();
	const replacement = parts.at(1)?.trim();

	if (!pattern || !replacement) {
		return acc;
	}

	// check for regex pattern
	if (pattern.startsWith("/")) {
		try {
			const regex = new RegExp(pattern);
			acc.push([regex, replacement]);
		} catch {
			acc.push([pattern, replacement]);
		}
	} else {
		// string pattern
		acc.push([pattern, replacement]);
	}

	return acc;
}

export {
	//,
	parseReplaceOption,
};
