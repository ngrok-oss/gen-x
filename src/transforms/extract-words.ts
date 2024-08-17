/**
 * Extract words from a string
 * trims and filters out empty strings and punctuation
 *
 * splits on whitespace, underscores, hyphens, periods, commas, semicolons, colons and camel case
 */
function extractWords(value: string): Array<string> {
	return value
		.split(/[\s_\-.,;:]|(?=[A-Z])/)
		.map((word) => word.trim())
		.filter(Boolean);
}

export {
	//,
	extractWords,
};
