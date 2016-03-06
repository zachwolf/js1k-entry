sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'Arm', () ->
  describe '#initialize', () ->
    it 'should do something', () ->
      expect(true).to.be(true)