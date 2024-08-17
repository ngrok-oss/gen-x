/**
 * The filepath naming transform modes that the library supports
 */
const transformModes = [
	/**
	 * Transform the filepath to camelCase
	 */
	"camelCase",
	/**
	 * Transform the filepath to kebab-case
	 */
	"kebab-case",
	/**
	 * Transform the filepath to PascalCase / UpperCamelCase
	 */
	"PascalCase",
	/**
	 * Do not transform the filepath
	 */
	"passthrough",
	/**
	 * Transform the filepath to snake_case
	 */
	"snake_case",
] as const;

/**
 * A filepath naming transform modes that the library supports
 */
export type TransformMode = (typeof transformModes)[number];

/**
 * A type-safe function to create a mode
 */
const transformMode = <T extends TransformMode>(value: T): T => value;

/**
 * Predicate to check if a value is a mode
 */
function isTransformMode(value: unknown): value is TransformMode {
	return typeof value === "string" && transformModes.includes(value as TransformMode);
}

export {
	//,
	isTransformMode,
	transformMode,
	transformModes,
};
