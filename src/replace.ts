/**
 * A tuple representing a pattern and replacement string, where the pattern is a string or regex.
 */
export type ReplaceTuple = [string | RegExp, string];

/**
 * An array of replace tuples.
 */
export type ReplaceTuples = Array<ReplaceTuple>;

/**
 * Parse the replace option value and return an array of replace tuples.
 */
function parseReplaceOption(value: string, acc: ReplaceTuples): ReplaceTuples {
	const parts = value.split("=");
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
