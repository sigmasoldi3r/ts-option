# Option ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![License](https://img.shields.io/github/license/sigmasoldi3r/ts-option.svg)

Optional values are meant to describe a value that is
_explicitly_ present or not.

This makes the presence of the value more clear, in contrast
to making the value nullable (Which will not work if the
compiler is not set to check strictly null values), or
undefined.

As a side effect, makes an optional value capable of holding
a null value, because you might encounter situations where
you want a null value to be a valid one.

## Installation

Run `yarn add @octantis/option` or `npm i @octantis/option`

## API

Option is iterable, in case that the value is present yields
the value.

The option value is meant to mimic Scala's `option[A]` type.

```ts
/**
 * True if not empty
 */
isDefined(): this is Some<A>;
/**
 * Return value, throw exception if empty
 */
get(): A;
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
orElse(alternative: option<A>): option<A>;
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
map<B>(map: (value: A) => B): option<B>;
/**
 * Same as map but function must return an optional value
 */
flatMap<B>(map: (value: A) => option<B>): option<B>;
/**
 * Apply a procedure on option value
 */
forEach(consumer: (value: A) => void): void;
/**
 * Apply partial pattern match on optional value
 */
collect<B>(collector: (value: A) => B | undefined): option<B>;
/**
 * An optional value satisfies predicate
 */
filter(filter: (value: A) => boolean): option<A>;
/**
 * An optional value doesn't satisfy predicate
 */
filterNot(filter: (value: A) => boolean): option<A>;
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
zip<B>(that: option<B>): option<[A, B]>;
/**
 * Unary list of optional value, otherwise the empty list
 */
toList(): A[];
```

## Example usage

Simplest example:

```ts
// Assume a function
function maybe(): option<number>

let n = maybe()

// This acts as a guard, so now n is of type Some<number>
if (n.isDefined()) {
  console.log(`n = ${n.value}`)
}

// Or at runtime
console.log(`n = ${n.get()}`)
// This throws if the value wasn't present.
```

With iteration:

```ts
for (const value of maybe()) {
  console.log(`value = ${value}`)
}
```
