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
	mode: TransformMode;
	replace?: ReplaceTuples;
};

/**
 * Given a list of file paths and a transform mode, return a list of export items.
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

function makeNameFromFilepath(filepath: string, options: Options): string {
	const parsed = path.parse(filepath);
	const name = [parsed.dir, parsed.name].filter(Boolean).join(path.sep);

	const transformedName = transformFilepathByMode(name, options.mode);

	const replaceTuples = options.replace ?? [];

	return replaceTuples.reduce((acc, [pattern, replacement]) => {
		return acc.replace(pattern, replacement);
	}, transformedName);
}
