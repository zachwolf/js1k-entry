sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'Rotor', ->
  Rotor = null

  before (done) ->
    shim
      path: '../src/js/Rotor.js'
      exports: 'Rotor'
    .then (shim) ->
      Rotor = shim
      done()

  describe '#initialize', ->
    initSpy = null

    beforeEach ->
      initSpy = sinon.spy(Rotor.prototype, 'initialize')
      
    afterEach ->
      initSpy = null
      Rotor.prototype.initialize.restore()

    it 'should be called immediately', ->
      rotor = new Rotor()
      expect(initSpy.calledOnce).to.be true

    it 'should be called with constructor parameters', ->
      x = '😀'
      y = '😁'
      r = '😂'
      s = '😾'
      rotor = new Rotor(x, y, r, s)
      expect(initSpy.args[0][0]).to.equal x
      expect(initSpy.args[0][1]).to.equal y
      expect(initSpy.args[0][2]).to.equal r
      expect(initSpy.args[0][3]).to.equal s

    it 'should set initial value from passed parameters', ->
      x = '😀'
      y = '😁'
      r = '😂'
      s = '😾'
      rotor = new Rotor(x, y, r, s)
      expect(rotor.x).to.equal x
      expect(rotor.y).to.equal y
      expect(rotor.radius).to.equal r
      expect(rotor.speed).to.equal s

    it 'should set initial rotation', ->
      rotor = new Rotor()
      expect(rotor.rotation).to.not.be undefined

  describe '#transform', ->

    before ->
      global.getFPS = (cb) ->
        cb(100)

    after ->
      delete global.getFPS

    it 'should increment the rotor\'s rotation', ->
      rotor = new Rotor(0, 0, 0, 100)

      prevRotation = rotor.rotation

      rotor.transform()

      expect(rotor.rotation).to.not.equal prevRotation

    it 'should calculate distance based on passed speed', ->
      round = (val) ->
        Math.round(val * 10000)

      rotorA = new Rotor(0, 0, 0, 1000)
      rotorB = new Rotor(0, 0, 0, 2000)

      rotorA.transform()
      rotorB.transform()

      expect(round(rotorA.rotation)).to.equal round(rotorB.rotation) * 2
