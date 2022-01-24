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

describe('Iterator-like API', () => {
  it('Should iterate once the option value', () => {
    let i = 0
    for (const value of withValue()) {
      i += value
    }
    expect(i).to.be.eq(TEST_SAMPLE_VALUE)
  })
  it('Should map the value, if present.', () => {
    const value = withValue()
      .map((n) => n + 1)
      .get()
    expect(value).to.be.eq(TEST_SAMPLE_VALUE + 1)
    const noValue = withoutValue().map((n) => n + 1)
    expect(noValue.isDefined()).to.be.false
  })
  it('Should get the value if present, or the alternative.', () => {
    expect(withValue().getOrElse(0)).to.be.eq(TEST_SAMPLE_VALUE)
    expect(withoutValue().getOrElse(0)).to.be.eq(0)
  })
  it('Should fold the value, if present', () => {
    const fallback = 'NO VALUE'
    const a = withValue().fold(fallback, (n) => n.toString())
    const b = withoutValue().fold(fallback, (n) => n.toString())
    expect(a).to.be.eq(TEST_SAMPLE_VALUE.toString())
    expect(b).to.be.eq(fallback)
  })
  it('Should flat-map values from optionals', () => {
    const a = withValue().flatMap((n) => some('hello'))
    const b = withoutValue().flatMap((n) => some('hello'))
    expect(a.get()).to.be.eq('hello')
    expect(b.isDefined()).to.be.false
  })
})
