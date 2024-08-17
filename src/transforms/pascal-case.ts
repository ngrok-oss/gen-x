import { extractWords } from "./extract-words.js";
import { transformPath } from "./transform-path.js";

/**
 * Convert a string to PascalCase
 *
 * @note
 * This isn't fully generic/bullet proof, but it works for our use case atm
 *
 * @example
 * ```ts
 * pascalCase("hello_world") // #=> HelloWorld
 * pascalCase("hello-world") // #=> HelloWorld
 * pascalCase("hello world") // #=> HelloWorld
 * pascalCase("helloWorld") // #=> HelloWorld
 * pascalCase("HelloWorld") // #=> HelloWorld
 * ```
 */
function pascalCase(value: string): string {
	const words = extractWords(value).map((word) => pascalCaseWord(word));
	return words.join("");
}

/**
 * Convert a path to PascalCase
 *
 * @example
 * ```ts
 * pascalCasePath("hello_world/helloWorld/hello-world") // #=> HelloWorld/HelloWorld/HelloWorld
 * ```
 */
function pascalCasePath(filepath: string): string {
	return transformPath(filepath, pascalCase);
}

export {
	//,
	pascalCase,
	pascalCasePath,
};

/**
 * Convert a word to PascalCase
 */
function pascalCaseWord(word: string): string {
	return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
}
