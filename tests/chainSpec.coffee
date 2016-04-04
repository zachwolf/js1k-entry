sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'Chain', () ->
  Chain = null
  noop = () -> # generic shared function

  # Import function
  before (done) ->
    shim
      path: '../src/js/Chain.js'
      exports: 'Chain'
    .then (shim) ->
      Chain = shim
      done()

  # tests!
  describe '#initialize', ->
    it 'should call original methods', ->
      spy = sinon.spy noop
      obj = new Chain
        fn: spy

      obj.fn()

      expect(spy).was.called()

    it 'should return itsself', ->
      obj = new Chain
        fn: noop,
        foo: noop,
        bar: noop

      expect(obj.fn().foo().bar()).to.be.a Chain

  describe '#set', ->
    obj   = null
    chain = null

    beforeEach ->
      obj = 
        val: 'foo'

      chain = new Chain obj

    afterEach ->
      obj = null
      chain = null

    it 'update the original objects property value', ->
      chain.set('val', 'bar')
      expect(obj.val).to.equal 'bar'

    it 'should return itsself', ->
      expect(chain.set()).to.be.a Chain