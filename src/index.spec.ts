import { expect } from 'chai'
import { None, none, NoValueError, option, Some, some } from '.'

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

// describe('A', () => {})
