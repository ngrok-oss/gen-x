import path from "path";
import { ReplaceTuples } from "./replace.js";
import { TransformMode } from "./transforms/mode.js";
import { transformFilepathByMode } from "./transforms/transform-filepath-by-mode.js";

export type ExportItem = {
	/**
	 * The name of the export, may be transformed by the mode and replaced by the replace tuples
	 */
	name: string;
	/**
	 * The export's path, relative to the containing directory, sans the file extension
	 */
	path: string;
	/**
	 * The export's source directory
	 */
	srcDir: string;
};

type Options = {
	/**
	 * The input directory to gather file paths from.
	 */
	input: string;
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
		const srcDir = options.input;
		const exportPath = path.relative(srcDir, filepath);
		const name = makeNameFromFilepath(exportPath, options);

		return {
			name,
			path: exportPath,
			srcDir,
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
