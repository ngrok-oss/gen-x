import fs from "node:fs/promises";
import { ExportsField } from "./build-package-json-exports.js";

type Args = {
	/**
	 * Preview changes to standard out for debugging.
	 */
	dryRun?: boolean;
	/**
	 * The exports object to write to the package.json file.
	 */
	exports: ExportsField;
	/**
	 * The path to the package.json file to write to.
	 */
	packageJsonPath: string;
};

/**
 * Update the package.json file with the new exports object.
 *
 * Set `dryRun` to `true` to preview changes to standard out for debugging,
 * else the changes will be written to the package.json file.
 */
async function updatePackageJson({ dryRun = false, exports, packageJsonPath }: Args) {
	// read the package.json file
	const originalPackageJsonFile = await fs.readFile(packageJsonPath, "utf8");

	// convert the package.json file to a JSON object
	const originalPackageJson = JSON.parse(originalPackageJsonFile) as Record<string, unknown>;

	// delete the exports field from the package.json object so it is always at the end
	delete originalPackageJson.exports;

	// set the exports field to the new exports object
	const updatedPackageJson = {
		...originalPackageJson,
		exports,
	};

	// don't write to disk if dry run is set, just preview the changes in stdout
	if (dryRun) {
		console.log("Dry run:");
		console.log(updatedPackageJson);
		return;
	}

	console.log(`Writing exports to ${packageJsonPath}`);

	// stringify the updated package.json object
	let data = JSON.stringify(updatedPackageJson, null, 2);

	// preserve cross-platform EOF newline if original package.json file has one
	let eofNewline = "";
	if (originalPackageJsonFile.endsWith("\r\n")) {
		eofNewline = "\r\n"; // Windows-style newline
	} else if (originalPackageJsonFile.endsWith("\n")) {
		eofNewline = "\n"; // Unix-style newline
	}
	data += eofNewline;

	// write the updated package.json file
	await fs.writeFile(packageJsonPath, data, "utf8");
}

export {
	//,
	updatePackageJson,
};
