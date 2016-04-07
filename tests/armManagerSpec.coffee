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
    it 'should be called immediately', ->
      initSpy = sinon.spy(ArmManager.prototype, 'initialize')

      armManager = new ArmManager({}, {})

      expect(initSpy.calledOnce).to.be true

      ArmManager.prototype.initialize.restore()

    it 'should save passed arms', ->
      armA = {}
      armB = {}
      armManager = new ArmManager(armA, armB)

      expect(armManager.armA).to.equal armA
      expect(armManager.armB).to.equal armB

  describe '#updateAll', ->
    xit 'should update all managed arms', ->

  describe '#draw', ->
    armA = null
    armB = null
    armManager = null

    beforeEach ->
      armA = {
        draw: sinon.spy()
      }
      armB = {
        draw: sinon.spy()
      }

      armManager = new ArmManager(armA, armB)

    afterEach ->
      armA = null
      armB = null
      armManager = null

    it 'should draw all managed arm\'s', ->
      armManager.draw()

      expect(armA.draw.calledOnce).to.be true
      expect(armB.draw.calledOnce).to.be true

    it 'should pass canvas context to arm\'s draw', ->
      cntx = '💯'

      armManager.draw(cntx)

      expect(armA.draw.args[0][0]).to.be cntx
      expect(armB.draw.args[0][0]).to.be cntx
