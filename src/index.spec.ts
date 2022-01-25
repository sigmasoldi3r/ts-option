import { expect } from 'chai'
import { None, none, option, Some, some } from '.'

const TEST_SAMPLE_VALUE = 10

function withValue(): option<number> {
  return some(TEST_SAMPLE_VALUE)
}

function withoutValue(): option<number> {
  return none()
}

describe('Basic defined-value behaviour', () => {
  const result = withValue()
  it('Should match instance constructor', () => {
    expect(result).to.be.instanceOf(Some)
  })
  it('Should be defined', () => {
    expect(result.isDefined()).to.be.true
    expect(result.isEmpty()).to.be.false
    expect(result.nonEmpty()).to.be.true
  })
  it('Should unwrap the contained value', () => {
    expect(result.get()).to.be.eq(TEST_SAMPLE_VALUE)
  })
})

describe('Basic non-defined-value behaviour', () => {
  const result = withoutValue()
  it('Should match instance constructor', () => {
    expect(result).to.be.instanceOf(None)
  })
  it('Should not be defined', () => {
    expect(result.isDefined()).to.be.false
    expect(result.isEmpty()).to.be.true
    expect(result.nonEmpty()).to.be.false
  })
  it('Should not unwrap the value, throw error instead', () => {
    expect(() => result.get()).to.throw('Option did not contain any value')
  })
})

describe('Safe optional access', () => {
  it('Should map to an alternative optional, if missing', () => {
    const a = withValue().orElse(some(-1))
    const b = withoutValue().orElse(some(-1))
    expect(a.get()).to.be.eq(TEST_SAMPLE_VALUE)
    expect(b.get()).to.be.eq(-1)
  })
  it('Should map to an alternative value, if missing', () => {
    expect(withValue().getOrElse(0)).to.be.eq(TEST_SAMPLE_VALUE)
    expect(withoutValue().getOrElse(0)).to.be.eq(0)
  })
})

describe('Iterator-like API', () => {
  it('Should iterate once the option value', () => {
    let i = 0
    for (const value of withValue()) {
      i += value
    }
    expect(i).to.be.eq(TEST_SAMPLE_VALUE)
  })
  it("Shouldn't iterate at all if the option is none", () => {
    let i = 0
    for (const value of withoutValue()) {
      i += value
    }
    expect(i).to.be.eq(0)
  })
  it('Should map the value, if present.', () => {
    const value = withValue()
      .map((n) => n + 1)
      .get()
    expect(value).to.be.eq(TEST_SAMPLE_VALUE + 1)
    const noValue = withoutValue().map((n) => n + 1)
    expect(noValue.isDefined()).to.be.false
  })
  it('Should fold the value, if present', () => {
    const fallback = 'NO VALUE'
    const a = withValue().fold(fallback, (n) => n.toString())
    const b = withoutValue().fold(fallback, (n) => n.toString())
    expect(a).to.be.eq(TEST_SAMPLE_VALUE.toString())
    expect(b).to.be.eq(fallback)
  })
  it('Should flat-map values from optionals', () => {
    const a = withValue().flatMap((_) => some('hello'))
    const b = withoutValue().flatMap((_) => some('hello'))
    expect(a.get()).to.be.eq('hello')
    expect(b.isDefined()).to.be.false
  })
  it('Should iterate once, if value is present', () => {
    let count = 0
    withValue().forEach((_) => (count += 1))
    withoutValue().forEach((_) => (count += 1))
    expect(count).to.be.eq(1)
  })
  it('Should map and collect values if present', () => {
    let a = withValue().collect((n) => n * 2)
    let b = withValue().collect((_) => undefined)
    let c = withoutValue().collect((n) => n * 2)
    let d = withoutValue().collect((_) => undefined)
    expect(a.isDefined()).to.be.true
    expect(a.get()).to.be.eq(TEST_SAMPLE_VALUE * 2)
    expect(b.isDefined()).to.be.false
    expect(c.isDefined()).to.be.false
    expect(d.isDefined()).to.be.false
  })
  it('Should filter the value, if present', () => {
    let a = withValue().filter((n) => n === TEST_SAMPLE_VALUE)
    let b = withValue().filter((n) => n === 0)
    let c = withoutValue().filter((_) => false)
    let d = withoutValue().filter((_) => false)
    expect(a.isDefined()).to.be.true
    expect(a.get()).to.be.eq(TEST_SAMPLE_VALUE)
    expect(b.isDefined()).to.be.false
    expect(c.isDefined()).to.be.false
    expect(d.isDefined()).to.be.false
  })
  it('Should filter not the value, if present', () => {
    let a = withValue().filterNot((n) => n === TEST_SAMPLE_VALUE)
    let b = withValue().filterNot((n) => n === 0)
    let c = withoutValue().filterNot((_) => false)
    let d = withoutValue().filterNot((_) => false)
    expect(a.isDefined()).to.be.false
    expect(b.isDefined()).to.be.true
    expect(b.get()).to.be.eq(TEST_SAMPLE_VALUE)
    expect(c.isDefined()).to.be.false
    expect(d.isDefined()).to.be.false
  })
  it('Should return true in case that exists, and the predicate is true', () => {
    let a = withValue().exists((n) => n === TEST_SAMPLE_VALUE)
    let b = withValue().exists((n) => n === 0)
    let c = withoutValue().exists((n) => n === TEST_SAMPLE_VALUE)
    let d = withoutValue().exists((n) => n === 0)
    expect(a).to.be.true
    expect(b).to.be.false
    expect(c).to.be.false
    expect(d).to.be.false
  })
  it('Should return true in case that all options match, true if no value', () => {
    let a = withValue().forAll((n) => n === TEST_SAMPLE_VALUE)
    let b = withValue().forAll((n) => n === 0)
    let c = withoutValue().forAll((n) => n === TEST_SAMPLE_VALUE)
    let d = withoutValue().forAll((n) => n === 0)
    expect(a).to.be.true
    expect(b).to.be.false
    expect(c).to.be.true
    expect(d).to.be.true
  })
  it('Should return true if the value holds an equal value', () => {
    expect(withValue().contains(TEST_SAMPLE_VALUE)).to.be.true
    expect(withValue().contains(0)).to.be.false
    expect(withoutValue().contains(TEST_SAMPLE_VALUE)).to.be.false
    expect(withoutValue().contains(0)).to.be.false
  })
})
