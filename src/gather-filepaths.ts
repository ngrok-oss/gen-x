import path from "node:path";
import { glob } from "tinyglobby";
import { setDifference } from "./set.js";
import { TransformMode } from "./transforms/mode.js";
import { transformFilepathByMode } from "./transforms/transform-filepath-by-mode.js";

type GatherFilepathsOptions = {
	/**
	 * The input directory to search for files
	 */
	input: string;
	/**
	 * The filepath globs to include in the search
	 */
	include: Array<string>;
	/**
	 * The filepath globs to exclude from the search
	 */
	exclude: Array<string>;
	/**
	 * The transform mode to apply to the filepaths
	 */
	mode: TransformMode;
};

/**
 *
 * @param options
 * @returns
 */
async function gatherFilepaths(options: GatherFilepathsOptions): Promise<Array<string>> {
	// gather the file paths based on the include and exclude globs and the given input directory
	const [includeFilepaths, excludeFilepaths] = await Promise.all([
		glob(options.include, { onlyFiles: true, cwd: options.input, absolute: true }),
		glob(options.exclude, { onlyFiles: true, cwd: options.input, absolute: true }),
	]);

	// filter out any excluded file paths
	const includeSet = new Set(includeFilepaths);
	const excludeSet = new Set(excludeFilepaths);
	const uniqueFilepaths = setDifference(includeSet, excludeSet);
	const filepaths = Array.from(uniqueFilepaths);

	// alphasort the file paths
	filepaths.sort((a, b) => a.localeCompare(b));

	// transform the file paths based on the mode
	return filepaths.map((filepath) => {
		const relativePath = path.relative(options.input, filepath);
		return transformFilepathByMode(relativePath, options.mode);
	});
}

export {
	//,
	gatherFilepaths,
};
