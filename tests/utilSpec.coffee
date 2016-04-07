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

  describe '#getIntersects', ->
    getIntersects = null

    before (done) ->
      shim
        path: '../src/js/util.js'
        exports: 'getIntersects'
      .then (shim) ->
        getIntersects = shim
        done()

    it 'should return two possible points when arm\'s reach overlaps', ->
      c0 = {
        r: 100,
        x: 100,
        y: 100
      }

      c1 = {
        r: 100,
        x: 150,
        y: 100
      }

      intersects = getIntersects(c0, c1)

      expect(intersects).to.be.an Array
      expect(intersects.length).to.equal 2

    it 'should return false when one arm contains the other\'s reach', ->
      c0 = {
        r: 100,
        x: 100,
        y: 100
      }

      c1 = {
        r: 10,
        x: 100,
        y: 100
      }

      intersects = getIntersects(c0, c1)

      expect(intersects).to.be.false

    it 'should return false when both arms reach don\'t intersect', ->
      c0 = {
        r: 50,
        x: 100,
        y: 100
      }

      c1 = {
        r: 50,
        x: 300,
        y: 100
      }

      intersects = getIntersects(c0, c1)

      expect(intersects).to.be.false

