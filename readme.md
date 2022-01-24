# Option

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

## Example usage

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

<!-- ## API

The option value is meant to mimic Scala's `option[A]` type,
so you have the following methods:

```ts

``` -->
