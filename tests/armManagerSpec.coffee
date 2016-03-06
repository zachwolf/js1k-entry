sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'ArmManager', () ->
  ArmManager = null

  before (done) ->
    shim
      path: '../src/js/armManager.js'
      exports: 'ArmManager'
    .then (shim) ->
      ArmManager = shim
      done()

  describe '#initialize', ->
    it 'should do something', ->
      expect(true).to.be(true)