import OptionInterface from "./OptionInterface";
import { Option } from "./Option";
import { None } from "./None";

export interface Some<A> extends OptionInterface<A> {
  defined: true;
  value: A;
}

/**
 * This object contains a value.
 */
export const Some = function <A>(this: Some<A>, value: A) {
  if (new.target == null) {
    return new Some<A>(value);
  }
  this.defined = true;
  this.value = value;
} as unknown as (<A>(value: A) => Some<A>) & { new <A>(value: A): Some<A> };

Some.prototype.isDefined = function () {
  return true;
};
Some.prototype.get = function () {
  return this.value;
};
Some.prototype.getOrThrow = function (willThrow: unknown) {
  return this.value;
};
Some.prototype.isEmpty = function () {
  return false;
};
Some.prototype.nonEmpty = function () {
  return true;
};
Some.prototype.orElse = function (alternative: Option<unknown>) {
  return this;
};
Some.prototype.getOrElse = function (alternative: unknown) {
  return this.value;
};
Some.prototype.fold = function (
  fallback: unknown,
  folder: (value: unknown) => unknown
) {
  return folder(this.value);
};
Some.prototype.map = function (map: (value: unknown) => unknown) {
  return Some(map(this.value));
};
Some.prototype.flatMap = function (map: (value: unknown) => Option<unknown>) {
  return map(this.value);
};
Some.prototype.forEach = function (consumer: (value: unknown) => void) {
  consumer(this.value);
};
Some.prototype.collect = function (
  collector: (value: unknown) => unknown | undefined
) {
  const result = collector(this.value);
  if (typeof result !== "undefined") {
    return Some(result);
  }
  return None();
};
Some.prototype.filter = function (filter: (value: unknown) => boolean) {
  if (filter(this.value)) {
    return this;
  }
  return None();
};
Some.prototype.filterNot = function (filter: (value: unknown) => boolean) {
  if (!filter(this.value)) {
    return this;
  }
  return None();
};
Some.prototype.exists = function (predicate: (value: unknown) => boolean) {
  return predicate(this.value);
};
Some.prototype.forAll = function (predicate: (value: unknown) => boolean) {
  return predicate(this.value);
};
Some.prototype.contains = function (element: unknown) {
  return this.value === element;
};
Some.prototype.zip = function (that: Option<unknown>) {
  if (that.isDefined()) {
    return Some([this.value, that.value]);
  }
  return None();
};
Some.prototype.unzip = function () {
  return [Some(this.value[0]), Some(this.value[1])] as any;
};
Some.prototype.unzip3 = function () {
  return [Some(this.value[0]), Some(this.value[1]), Some(this.value[2])] as any;
};
Some.prototype.toList = function () {
  return [...this];
};
Some.prototype[Symbol.iterator] = function* () {
  yield this.value;
};
