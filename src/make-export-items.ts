import path from "path";
import { ReplaceTuples } from "./replace.js";
import { TransformMode } from "./transforms/mode.js";
import { transformFilepathByMode } from "./transforms/transform-filepath-by-mode.js";

export type ExportItem = {
	/**
	 * The name of the export, lower-kebab-case
	 */
	name: string;
	/**
	 * The export's path, relative to the containing directory, sans the file extension
	 */
	path: string;
};

type Options = {
	/**
	 * The mode to transform filepath segments.
	 */
	mode: TransformMode;
	/**
	 * An optional list of replace tuples to rename export names.
	 */
	replace?: ReplaceTuples;
};

/**
 * Given a list of file paths and options, return a list of export items.
 *
 * When building the name, the order of operations is:
 * 1. Take the file path and remove the extension
 * 2. Replace the name with the replace tuples
 * 3. Transform the name based on the mode
 */
function makeExportItems(filepaths: Array<string>, options: Options): Array<ExportItem> {
	return filepaths.map((filepath) => {
		const name = makeNameFromFilepath(filepath, options);

		return {
			name,
			path: filepath,
		};
	});
}

export {
	//,
	makeExportItems,
};

/**
 * Given a file path and options, return the name of the export.
 * The order of operations is:
 *  1. Take the file path and remove the extension
 *  2. Replace the name with the replace tuples
 *  3. Transform the name based on the mode
 */
function makeNameFromFilepath(filepath: string, options: Options): string {
	const parsed = path.parse(filepath);

	// 1. remove the extension
	const name = [parsed.dir, parsed.name].filter(Boolean).join(path.sep);
	// 2. replace the name with the replace tuples
	const replacedName = replaceName(name, options.replace);
	// 3. transform the name based on the mode
	const transformedName = transformFilepathByMode(replacedName, options.mode);

	return transformedName;
}

/**
 * Given a value and a list of replace tuples, return the value with the replacements applied.
 */
function replaceName(value: string, replaceTuples: ReplaceTuples = []): string {
	return replaceTuples.reduce((acc, [pattern, replacement]) => {
		return acc.replace(pattern, replacement);
	}, value);
}
