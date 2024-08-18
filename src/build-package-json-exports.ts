import path from "path";
import { ExportItem } from "./make-export-items.js";

export type ExportEntry = string | { import: string; types: string };
export type ExportsField = Record<string, ExportEntry>;

// base exports for the package.json
const baseExports = {
	"./package.json": "./package.json",
} as const satisfies ExportsField;

/**
 * Given the list of filepaths and an optional outputDir, return a new object package.json#exports object
 *
 * @default outputDir `dist`
 */
function buildPackageJsonExports(exportItems: Array<ExportItem>, outputDir: string = "dist"): ExportsField {
	return exportItems.reduce<ExportsField>((acc, item) => {
		const parsed = path.parse(item.path);
		const name = [".", item.name].filter(Boolean).join(path.sep);
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
