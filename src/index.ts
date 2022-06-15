/*
  Option module.
*/
import { None } from "./None";
import { Option } from "./Option";
import { Some } from "./Some";

/** @deprecated See {Option<A>} */
export type option<A> = Option<A>;

export { Some, None };
export type { Option };

/**
 * Creates a defined value.
 * @deprecated Call Some<A>(value) directly.
 */
export function some<A>(value: A): Option<A> {
  return new Some(value);
}

/**
 * Creates an empty value.
 * @deprecated Call None() directly.
 */
export function none<A = unknown>(): Option<A> {
  return None<A>();
}
