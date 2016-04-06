sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'util', ->

  describe '#noop', ->
    noop = null

    before (done) ->
      shim
        path: '../src/js/util.js'
        exports: 'noop'
      .then (shim) ->
        noop = shim
        done()

    it 'should be a function', ->
      expect(noop).to.be.a Function

  xdescribe '#getFPS', ->
    getFPS = null

    before (done) ->
      shim
        path: '../src/js/util.js'
        exports: 'getFPS'
      .then (shim) ->
        getFPS = shim
        done()

    it '...', ->

  describe '#sqr', ->
    sqr = null

    before (done) ->
      shim
        path: '../src/js/util.js'
        exports: 'sqr'
      .then (shim) ->
        sqr = shim
        done()

    it 'should be a function', ->
      expect(sqr).to.be.a Function

    it 'should square a number', ->
      expect(sqr(2)).to.equal 4
      expect(sqr(12)).to.equal 144

