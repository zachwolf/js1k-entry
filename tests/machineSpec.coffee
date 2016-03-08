sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')


describe 'Machine', () ->
  Machine = null
  machine = null
  context = null

  before (done) ->
    global.Rotor = sinon.spy()

    global.Pivot      = sinon.stub()
    global.Arm        = sinon.stub()
    global.ArmManager = sinon.stub()
    context = sinon.stub()

    shim
      path: '../src/js/Machine.js'
      exports: 'Machine'
    .then (shim) ->
      Machine = shim
      done()

  describe '#initialize', ->
    # beforeEach ->
      # machine = new Machine stub
      # machine = new Machine

    it 'should be called immediately', ->
      sinon.spy(Machine.prototype, 'initialize')

      machine = new Machine

      expect(machine.initialize).was.calledOnce()

    it 'should create two rotors', ->
      expect(global.Rotor.calledWithNew()).to.be true

    xit 'should create two arms', ->

    xit 'should create an ArmManager', ->

  xdescribe '#sequential', ->

    it 'should should be a method', ->

    it 'should return true if sequential', ->

    it 'should return false if not sequential', ->

  xdescribe '#draw', ->

    it 'should call draw on all rotors', ->

    it 'should call draw on all pivots', ->

    it 'should call draw on ArmManager', ->

  xdescribe '#increment', ->

    it 'should call transform on all rotors', ->

    it 'should call transform on all pivots', ->

    it 'should call updateAll on ArmManager', ->


###
var expect     = require('expect.js')
  , sinon      = require('sinon')
  , sExpect    = require('sinon-expect').enhance(expect, sinon, 'was')
  , imports    = require('../src/machine')
  , Chain      = imports.Chain
  , Machine    = imports.Machine
  , Rotor      = imports.Rotor
  , Pivot      = imports.Pivot
  , Arm        = imports.Arm
  , ArmManager = imports.ArmManager

  , noop        = function () {}
  , contextStub = new Chain({
      arc: noop,
      rect: noop,
      fill: noop,
      beginPath: noop,
      closePath: noop,
      moveTo: noop,
      lineTo: noop,
      stroke: noop
    })

describe('Machine', function () {

  describe('#initialize', function () {
    it('should be called immediately', function () {
      var spy = sinon.spy(Machine.prototype, 'initialize')
      var machine = new Machine()

      sExpect(spy).was.called()
    })

    it('should create two rotors', function () {
      var spy = sinon.spy(Rotor.prototype, 'initialize')
      var machine = new Machine()

      sExpect(spy).was.calledTwice()

      Rotor.prototype.initialize.restore()
    })

    it('should create two arms', function () {
      var spy = sinon.spy(Arm.prototype, 'initialize')
      var machine = new Machine()

      sExpect(spy).was.calledTwice()

      Arm.prototype.initialize.restore()
    })

    it('should create an ArmManager', function () {
      var spy = sinon.spy(ArmManager.prototype, 'initialize')
        , machine = new Machine()

      sExpect(spy).was.calledOnce()

      ArmManager.prototype.initialize.restore()
    })
  })

  describe('#sequential', function () {
    var machine = null

    beforeEach(function () {
      machine = new Machine()
    })

    afterEach(function () {
      machine = null
    })

    it('should should be a method', function () {
      expect(machine.sequential).to.be.a(Function)
    })

    it('should return true if sequential', function () {
      expect(machine.sequential([1, 2, 3, 4])).to.be(true)
      expect(machine.sequential([1, 2])).to.be(true)
      expect(machine.sequential([1, 2, 10, 100, 1000, 5000])).to.be(true)
      expect(machine.sequential([-100, 0, 100])).to.be(true)
      expect(machine.sequential([-5, -7, -9, -10])).to.be(true)
      expect(machine.sequential([-5, -4, -3, -1, 0, 4])).to.be(true)
      expect(machine.sequential([0, 0, 0])).to.be(true)
      expect(machine.sequential([.5, .6666667, .8])).to.be(true)
    })

    it('should return false if not sequential', function() {
      expect(machine.sequential([.5, 10, .8])).to.be(false)
      expect(machine.sequential([0, -10, 100])).to.be(false)
      expect(machine.sequential([.234, .222, .3456, 1234])).to.be(false)
    })
  })

  describe('#draw', function () {
    var machine

    beforeEach(function () {
      machine = new Machine(contextStub)
    })

    afterEach(function() {
      machine = null
    })

    it('should call draw on all rotors', function () {
      var rotorDrawSpy = sinon.spy(Rotor.prototype, 'draw')

      machine.draw(contextStub)

      sExpect(rotorDrawSpy).was.calledTwice()

      Rotor.prototype.draw.restore()
    })

    it('should call draw on all pivots', function () {
      var pivotDrawSpy = sinon.spy(Pivot.prototype, 'draw')

      machine.draw(contextStub)

      sExpect(pivotDrawSpy).was.calledTwice()

      Pivot.prototype.draw.restore()
    })

    it('should call draw on ArmManager', function () {
      var managerDrawSpy = sinon.spy(ArmManager.prototype, 'draw')

      machine.draw()

      sExpect(managerDrawSpy).was.calledOnce()

      ArmManager.prototype.draw.restore()
    })
  })

  describe('#increment', function() {
    var machine

    beforeEach(function () {
      machine = new Machine(contextStub)
    })

    afterEach(function () {
      machine = null
    })

    it('should call transform on all rotors', function () {
      var spy = sinon.spy(Rotor.prototype, 'transform')

      machine.increment()

      sExpect(spy).was.calledTwice()

      Rotor.prototype.transform.restore()
    })

    it('should call transform on all pivots', function () {
      var spy = sinon.spy(Pivot.prototype, 'transform')

      machine.increment()

      sExpect(spy).was.calledTwice()

      Pivot.prototype.transform.restore()
    })

    it('should call updateAll on ArmManager', function () {
      var spy = sinon.spy(ArmManager.prototype, 'updateAll')

      machine.increment()

      sExpect(spy).was.calledOnce()

      ArmManager.prototype.updateAll.restore()
    })
  })

  xit('should be smaller than 1kb', function (done) {
    var fs = require('fs')
      , path = require('path')
    fs.stat(path.join(__dirname, '../src/machine.js'), function (err, stats) {
      if (err) {
        console.log('unable to read machine.js')
      }
      expect(stats.size / 1000.0).to.be.lessThan(1)
      done()
    })
  })
})

###