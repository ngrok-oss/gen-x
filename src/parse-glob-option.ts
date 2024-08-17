/**
 * Parse glob option values into a list of globs
 */
function parseGlobOption(value: Array<string> | string | undefined): Array<string> {
	if (!value) {
		return [];
	}

	const list = Array.isArray(value) ? value : [value];

	return list.map((glob) => glob.trim()).filter(Boolean);
}

export {
	//,
	parseGlobOption,
};
