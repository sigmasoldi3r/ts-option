import { None } from "./None";
import { Some } from "./Some";

/**
 * # Option
 *
 * An option represents an immediate value that might **be**
 * , or **not be** present.
 *
 * This differentiates from just using `A | null` in two
 * particular cases:
 * - When strict null check is not enabled.
 * - When null may be a present, valid value.
 *
 * This makes the `option<A>` type specially useful, because
 * the option type states explicitly if the value is present
 * as meant, or otherwise not, even if `undefined` is a
 * valid case value.
 *
 * @example
 * let a: option<number> = maybe()
 * if (a.isPresent()) {
 *  // Here a is `some<A>`, which means that has a value.
 * }
 */
export type Option<A> = Some<A> | None<A>;
