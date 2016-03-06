sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'Pivot', () ->
  Pivot = null

  before (done) ->
    shim
      path: '../src/js/Pivot.js'
      exports: 'Pivot'
    .then (shim) ->
      Pivot = shim
      done()

  describe '#initialize', ->
    it 'should do something', ->
      expect(true).to.be(true)