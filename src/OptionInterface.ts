import { None } from "./None";
import { Some } from "./Some";
import { Option } from "./Option";

export default interface OptionInterface<A> extends Iterable<A> {
  /**
   * True if not empty
   */
  isDefined(): this is Some<A>;

  /**
   * Return value, throw exception if empty
   */
  get(): A;

  /**
   * Throws a custom object if option is empty.
   * @param willThrow
   */
  getOrThrow<B>(willThrow: B): A;

  /**
   * True if empty
   */
  isEmpty(): this is None<A>;

  /**
   * True if not empty
   */
  nonEmpty(): this is Some<A>;

  /**
   * Evaluate and return alternate optional value if empty
   */
  orElse(alternative: Option<A>): Option<A>;

  /**
   * Evaluate and return alternate value if empty
   */
  getOrElse(alternative: A): A;

  /**
   * Apply function on optional value, return default if empty
   */
  fold<B>(fallback: B, folder: (value: A) => B): B;

  /**
   * Apply a function on the optional value
   */
  map<B>(map: (value: A) => B): Option<B>;

  /**
   * Same as map but function must return an optional value
   */
  flatMap<B>(map: (value: A) => Option<B>): Option<B>;

  /**
   * Apply a procedure on option value
   */
  forEach(consumer: (value: A) => void): void;

  /**
   * Apply partial pattern match on optional value
   */
  collect<B>(collector: (value: A) => undefined): Option<A>;
  collect<B>(collector: (value: A) => any): Option<A>;
  collect<B>(collector: (value: A) => B): Option<B>;
  collect<B>(collector: (value: A) => B | undefined): Option<B>;

  /**
   * An optional value satisfies predicate
   */
  filter(filter: (value: A) => boolean): Option<A>;

  /**
   * An optional value doesn't satisfy predicate
   */
  filterNot(filter: (value: A) => boolean): Option<A>;

  /**
   * Apply predicate on optional value, or false if empty
   */
  exists(predicate: (value: A) => boolean): boolean;

  /**
   * Apply predicate on optional value, or true if empty
   */
  forAll(predicate: (value: A) => boolean): boolean;

  /**
   * Checks if value equals optional value, or false if empty
   */
  contains<B extends A>(element: B): boolean;

  /**
   * Combine two optional values to make a paired optional value
   */
  zip<B>(that: Option<B>): Option<[A, B]>;

  /**
   * Split an optional pair to two optional values
   */
  unzip(): A extends [any, any] ? [Option<A[0]>, Option<A[1]>] : never;

  /**
   * Split an optional triple to three optional values
   */
  unzip3(): A extends [any, any, any]
    ? [Option<A[0]>, Option<A[1]>, Option<A[2]>]
    : never;

  /**
   * Unary list of optional value, otherwise the empty list
   */
  toList(): A[];
}
