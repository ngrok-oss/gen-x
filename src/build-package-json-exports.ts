import path from "path";

export type ExportItem = string | { import: string; types: string };
export type ExportsField = Record<string, ExportItem>;

// base exports for the package.json
const baseExports = {
	"./package.json": "./package.json",
} as const satisfies ExportsField;

/**
 * Given the list of filepaths and an optional outputDir, return a new object package.json#exports object
 *
 * @default outputDir `dist`
 */
function buildPackageJsonExports(filepaths: Array<string>, outputDir: string = "dist"): ExportsField {
	return filepaths.reduce<ExportsField>((acc, filepath) => {
		const parsed = path.parse(filepath);
		const name = [".", parsed.dir, parsed.name].filter(Boolean).join(path.sep);
		const exportPath = [".", outputDir, parsed.dir, parsed.name].filter(Boolean).join(path.sep);

		acc[name] = {
			import: `${exportPath}.js`,
			types: `${exportPath}.d.ts`,
		};
		return acc;
	}, baseExports);
}

export {
	//,
	buildPackageJsonExports,
};
