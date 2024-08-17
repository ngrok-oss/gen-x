import { extractWords } from "./extract-words.js";
import { transformPath } from "./transform-path.js";

/**
 * Convert a string to snake_case
 *
 * @note
 * This isn't fully generic/bullet proof, but it works for our use case atm
 *
 * @example
 * ```ts
 * snakeCase("hello_world") // #=> HelloWorld
 * snakeCase("hello-world") // #=> HelloWorld
 * snakeCase("hello world") // #=> HelloWorld
 * snakeCase("helloWorld") // #=> HelloWorld
 * snakeCase("HelloWorld") // #=> HelloWorld
 * ```
 */
function snakeCase(value: string): string {
	const words = extractWords(value);
	return words.join("_").toLocaleLowerCase();
}

/**
 * Convert a path to snake_case
 *
 * @example
 * ```ts
 * snakeCasePath("hello_world/helloWorld/hello-world") // #=> hello_world/hello_world/hello_world
 * ```
 */
function snakeCasePath(filepath: string): string {
	return transformPath(filepath, snakeCase);
}

export {
	//,
	snakeCase,
	snakeCasePath,
};
