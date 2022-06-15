import OptionInterface from "./OptionInterface";
import { Option } from "./Option";

export interface None<A> extends OptionInterface<A> {
  defined: false;
}

export class NoValueError extends Error {
  static readonly DEFAULT_MESSAGE = `Attempting to unwrap an empty option!`;
  constructor() {
    super(NoValueError.DEFAULT_MESSAGE);
  }
}

/**
 * An option value that does not contain any value.
 */
export const None = function <A = unknown>(this: None<A>) {
  if (new.target == null) {
    return new None<A>();
  }
  this.defined = false;
} as unknown as (<A>() => None<A>) & { new <A>(): None<A> };

None.prototype.isDefined = function () {
  return false;
};
None.prototype.get = function () {
  throw new NoValueError();
};
None.prototype.getOrThrow = function (willThrow: unknown) {
  throw willThrow;
};
None.prototype.isEmpty = function () {
  return true;
};
None.prototype.nonEmpty = function () {
  return false;
};
None.prototype.orElse = function (alternative: Option<unknown>) {
  return alternative;
};
None.prototype.getOrElse = function (alternative: unknown) {
  return alternative;
};
None.prototype.fold = function (
  fallback: unknown,
  folder: (value: unknown) => unknown
) {
  return fallback;
};
None.prototype.map = function (map: (value: unknown) => unknown) {
  return None();
};
None.prototype.flatMap = function (map: (value: unknown) => Option<unknown>) {
  return None();
};
None.prototype.forEach = function (consumer: (value: unknown) => void) {};
None.prototype.collect = function (
  collector: (value: unknown) => unknown | undefined
) {
  return None();
};
None.prototype.filter = function (filter: (value: unknown) => boolean) {
  return None();
};
None.prototype.filterNot = function (filter: (value: unknown) => boolean) {
  return None();
};
None.prototype.exists = function (predicate: (value: unknown) => boolean) {
  return false;
};
None.prototype.forAll = function (predicate: (value: unknown) => boolean) {
  return true;
};
None.prototype.contains = function (element: unknown) {
  return false;
};
None.prototype.zip = function (that: Option<unknown>) {
  return None();
};
None.prototype.unzip = function () {
  return [None(), None()] as any;
};
None.prototype.unzip3 = function () {
  return [None(), None(), None()] as any;
};
None.prototype.toList = function () {
  return [...this];
};
None.prototype[Symbol.iterator] = function* () {};
