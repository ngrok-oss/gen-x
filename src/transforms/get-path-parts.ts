import path from "node:path";

type Options = {
	removeExtension?: boolean;
};

/**
 * Separate a file path into parts
 */
function getPathParts(filepath: string, options?: Options): Array<string> {
	const parsed = path.parse(filepath);
	const removeExtension = Boolean(options?.removeExtension);

	// split the directory into parts
	const parts = parsed.dir.split(path.sep);
	const name = removeExtension ? parsed.name : parsed.base;
	parts.push(name);

	return parts.filter(Boolean);
}

export {
	//,
	getPathParts,
};
