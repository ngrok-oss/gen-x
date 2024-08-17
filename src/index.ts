import path from "node:path";
import { buildPackageJsonExports, ExportsField } from "./build-package-json-exports.js";
import { gatherFilepaths } from "./gather-filepaths.js";
import { TransformMode } from "./transforms/mode.js";

type Args = {
	/**
	 * A list of globs to exclude file paths from.
	 * @default `["**\/*.test.*"]`
	 */
	exclude?: Array<string>;
	/**
	 * A list of globs to include file paths from.
	 * @default `["**\/*"]`
	 */
	include?: Array<string>;
	/**
	 * The input directory to gather file paths from.
	 * @default `process.cwd()/src`
	 */
	input?: string;
	/**
	 * The mode to transform filepath segments.
	 * @default `"passthrough"`
	 */
	mode?: TransformMode;
	/**
	 * The output directory for the package export files
	 */
	output?: string;
};

/**
 * Generate the exports object for the package given the arguments.
 */
async function generateExports(args: Args): Promise<ExportsField> {
	const { exclude, include, input, output, mode } = parseArguments(args);

	const filepaths = await gatherFilepaths({ input, include, exclude, mode });

	const exports = buildPackageJsonExports(filepaths, output);

	return exports;
}

export {
	//,
	generateExports,
};

/**
 * Parse the arguments object and return a new object with all properties as required.
 */
function parseArguments(args: Args): Required<Args> {
	const exclude = args.exclude ?? ["**/*.test.*"];
	const include = args.include ?? ["**/*"];
	const input = args.input?.trim() || [process.cwd(), "src"].join(path.sep);
	const mode = args.mode ?? "passthrough";
	const output = args.output?.trim() || [process.cwd(), "dist"].join(path.sep);

	return {
		exclude,
		include,
		input,
		mode,
		output,
	};
}
