###

todo...



sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'Machine', () ->
  Machine = null

  before (done) ->
    shim
      path: '../src/js/Machine.js'
      exports: 'Machine'
    .then (shim) ->
      Machine = shim
      done()

  describe '#initialize', ->
    it 'should do something', ->
      expect(true).to.be(true)

###