/*
  Option module.
*/

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
export type option<A> = Some<A> | None<A>

abstract class Option<A> {
  /**
   * True if not empty
   */
  abstract isDefined(): this is Some<A>

  /**
   * Return value, throw exception if empty
   */
  abstract get(): A

  /**
   * True if empty
   */
  isEmpty(): this is None<A> {
    return !this.isDefined()
  }

  /**
   * True if not empty
   */
  nonEmpty(): this is Some<A> {
    return this.isDefined()
  }

  /**
   * Evaluate and return alternate optional value if empty
   */
  orElse(alternative: option<A>): option<A> {
    if (this.isEmpty()) {
      return alternative
    }
    return this
  }

  /**
   * Evaluate and return alternate value if empty
   */
  getOrElse(alternative: A): A {
    if (this.isDefined()) {
      return this.value
    }
    return alternative
  }

  /**
   * Apply function on optional value, return default if empty
   */
  fold<B>(fallback: B, folder: (value: A) => B): B {
    if (this.isDefined()) {
      return folder(this.value)
    }
    return fallback
  }

  /**
   * Apply a function on the optional value
   */
  map<B>(map: (value: A) => B): option<B> {
    if (this.isDefined()) {
      return some(map(this.value))
    }
    return none()
  }

  /**
   * Same as map but function must return an optional value
   */
  flatMap<B>(map: (value: A) => option<B>): option<B> {
    if (this.isDefined()) {
      return map(this.value)
    }
    return none()
  }

  /**
   * Apply a procedure on option value
   */
  foreach(consumer: (value: A) => void): void {
    if (this.isDefined()) {
      consumer(this.value)
    }
  }

  /**
   * Apply partial pattern match on optional value
   */
  collect() {}
  /**
   * An optional value satisfies predicate
   */
  filter() {}
  /**
   * An optional value doesn't satisfy predicate
   */
  filterNot() {}
  /**
   * Apply predicate on optional value, or false if empty
   */
  exists() {}
  /**
   * Apply predicate on optional value, or true if empty
   */
  forall() {}
  /**
   * Checks if value equals optional value, or false if empty
   */
  contains() {}
  /**
   * Combine two optional values to make a paired optional value
   */
  zip() {}
  /**
   * Split an optional pair to two optional values
   */
  unzip() {}
  /**
   * Split an optional triple to three optional values
   */
  unzip3() {}
  /**
   * Unary list of optional value, otherwise the empty list
   */
  toList() {}

  *[Symbol.iterator]() {
    if (this.isDefined()) {
      yield this.value
    }
  }
}

export class NoValueError extends Error {}

/**
 * This object contains a value.
 */
export class Some<A> extends Option<A> {
  constructor(readonly value: A) {
    super()
  }
  override get(): A {
    return this.value
  }
  override isDefined(): this is Some<A> {
    return true
  }
}

/**
 * This object does NOT contain a value.
 */
export class None<A> extends Option<A> {
  override get(): A {
    throw new NoValueError('Option did not contain any value')
  }
  override isDefined(): this is Some<A> {
    return false
  }
}

/**
 * Creates a defined value.
 */
export function some<A>(value: A) {
  return new Some(value)
}

/**
 * Creates an empty value.
 */
export function none<A = unknown>() {
  return new None<A>()
}
