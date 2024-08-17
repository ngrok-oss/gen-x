import { extractWords } from "./extract-words.js";
import { transformPath } from "./transform-path.js";

/**
 * Convert a string to kebab-case
 *
 * @note
 * This isn't fully generic/bullet proof, but it works for our use case atm
 *
 * @example
 * ```ts
 * kebabCase("hello_world") // #=> hello-world
 * kebabCase("hello-world") // #=> hello-world
 * kebabCase("hello world") // #=> hello-world
 * kebabCase("HelloWorld") // #=> hello-world
 * ```
 */
function kebabCase(value: string): string {
	const words = extractWords(value);
	return words.join("-").toLocaleLowerCase();
}

/**
 * Convert a path to kebab-case
 *
 * @example
 * ```ts
 * kebabCasePath("hello_world/helloWorld/hello-world") // #=> hello-world/hello-world/hello-world
 * ```
 */
function kebabCasePath(filepath: string): string {
	return transformPath(filepath, kebabCase);
}

export {
	//,
	kebabCase,
	kebabCasePath,
};
