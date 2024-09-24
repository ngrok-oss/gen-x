import path from "path";
import { ExportItem } from "./make-export-items.js";

export type ExportEntry = string | ({ import: string; types: string } & Record<string, string>);
export type ExportsField = Record<string, ExportEntry>;

// base exports for the package.json
const baseExports = {
	"./package.json": "./package.json",
} as const satisfies ExportsField;

type Options = {
	/**
	 * Custom condition to add to the package.json exports for supporting live types in a monorepo
	 */
	customCondition?: string | null;
	/**
	 * The output directory for the package export files
	 * @default `dist`
	 */
	outputDir?: string;
};

/**
 * Given the list of filepaths and an optional outputDir, return a new object package.json#exports object
 */
function buildPackageJsonExports(exportItems: Array<ExportItem>, options?: Options): ExportsField {
	const outputDir = options?.outputDir?.trim() || "dist";
	const customCondition = options?.customCondition?.trim();

	console.log("buildPackageJsonExports", { outputDir, customCondition });

	return exportItems.reduce<ExportsField>((acc, item) => {
		const parsed = path.parse(item.path);
		const name = [".", item.name].filter(Boolean).join(path.sep);
		const exportPath = [".", outputDir, parsed.dir, parsed.name].filter(Boolean).join(path.sep);
		const sourcePath = [".", item.srcDir, item.path].filter(Boolean).join(path.sep);

		const entry = {
			// if customCondition is desired, it's important to add it as the first entry in the object
			...(customCondition ? { [customCondition]: sourcePath } : {}),
			import: `${exportPath}.js`,
			types: `${exportPath}.d.ts`,
		} as const satisfies ExportEntry;

		acc[name] = entry;

		return acc;
	}, baseExports);
}

export {
	//,
	buildPackageJsonExports,
};
