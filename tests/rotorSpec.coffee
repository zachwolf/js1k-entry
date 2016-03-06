sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'Rotor', () ->
  Rotor = null

  before (done) ->
    shim
      path: '../src/js/Rotor.js'
      exports: 'Rotor'
    .then (shim) ->
      Rotor = shim
      done()

  describe '#initialize', ->
    it 'should do something', ->
      expect(true).to.be(true)