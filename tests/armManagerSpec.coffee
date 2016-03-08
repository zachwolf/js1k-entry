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


###

describe('ArmManager', function () {
  var armStub = {
    transform: noop
  }

  describe('#initialize', function () {
    before(function () {
      sinon.stub(ArmManager.prototype, 'getIntersects', function () {
        return [[0, 0], [0, 0]]
      })
    })

    after(function () {
      ArmManager.prototype.getIntersects.restore()
    })
    
    it('should save passed parameters', function () {
      var armA = Object.assign({}, armStub)
        , armB = Object.assign({}, armStub)
        , manager = new ArmManager(armA, armB)

      expect(manager.armA).to.equal(armA)
      expect(manager.armB).to.equal(armB)
      expect(manager.armB).to.not.equal(armA)
    })

    it('should call updateAll', function () {
      var spy = sinon.spy(ArmManager.prototype, 'updateAll')
      var manager = new ArmManager(armStub, armStub)

      sExpect(spy).was.calledOnce()
    })
  })

  describe('#updateAll', function () {
    beforeEach(function () {
      sinon.stub(ArmManager.prototype, 'getIntersects', function () {
        return [[0, 0], [100, 100]]
      })
    })

    afterEach(function () {
      ArmManager.prototype.getIntersects.restore()
    })

    it('should set the arm angles', function () {
      var angleA = null
        , armA = Object.assign({
            pivot: {
              x: 0,
              y: 0
            }
          }, armStub)
        , angleB = null
        , armB = Object.assign({
            pivot: {
              x: 50,
              y: 50
            }
          }, armStub)
        , manager = new ArmManager(armA, armB)

      angleA = manager.armA.angle
      angleB = manager.armB.angle

      manager.updateAll()

      expect(manager.armA.angle).to.not.equal(angleA)
      expect(manager.armB.angle).to.not.equal(angleB)
    })

    it('should call transform on all arms', function () {
      var spy = sinon.spy(Arm.prototype, 'transform')

      ArmManager.prototype.updateAll.call({
        armA: new Arm(),
        armB: new Arm()
      })

      sExpect(spy).was.calledTwice()
    })

    it('should return itsself', function () {
      var arm = Object.assign({
            pivot: {
              x: 0,
              y: 0
            }
          }, armStub)
        , manager = new ArmManager(arm, arm)

      expect(manager.updateAll() instanceof ArmManager).to.be(true)
    })
  })

  describe('#getIntersects', function () {
    var armA = null
      , armB = null

    beforeEach(function () {
      armA = '...'
      armB = '...'
    })

    afterEach(function () {
      armA = null
      armB = null
    })

    it('should return an array if there are intersecting points', function () {
      var armA = Object.assign({
            length: 200,
            pivot: {
              x: 0,
              y: 0
            }
          }, armStub)
        , armB = Object.assign({
            length: 200,
            pivot: {
              x: 100,
              y: 0
            }
          }, armStub)
        , manager = new ArmManager(armA, armB)
        , points = manager.getIntersects()

      expect(points).to.be.an(Array)
    })

    it('should return false if there are no intersecting points', function () {
      var armA = Object.assign({
            length: 200,
            pivot: {
              x: 0,
              y: 0
            }
          }, armStub)
        , armB = Object.assign({
            length: 200,
            pivot: {
              x: 600,
              y: 0
            }
          }, armStub)
        , manager = new ArmManager(armA, armB)
        , points = manager.getIntersects()

      expect(points).to.be(false)
    })

    it('should find correct intersecting points', function () {
      var armA = Object.assign({
            length: 200,
            pivot: {
              x: 0,
              y: 0
            }
          }, armStub)
        , armB = Object.assign({
            length: 200,
            pivot: {
              x: 400,
              y: 0
            }
          }, armStub)
        , manager = new ArmManager(armA, armB)
        , points = manager.getIntersects()

      expect(points).to.eql([[200, 0], [200, 0]])
    })
  })

  describe('draw', function () {
    var manager
      , armDrawSpy

    before(function () {
      var arm = new Arm({
        x: 0,
        y: 0
      })

      sinon.stub(ArmManager.prototype, 'getIntersects')
      armDrawSpy = sinon.spy(Arm.prototype, 'draw')
      manager = new ArmManager(arm, arm)
    })

    after(function () {
      Arm.prototype.draw.restore()
      ArmManager.prototype.getIntersects.restore()
    })

    it('should call draw on all managed arms', function () {
      manager.draw(contextStub)
      sExpect(armDrawSpy).was.calledTwice()
    })

    it('should return itsself', function () {
      expect(manager.draw(contextStub) instanceof ArmManager).to.be(true)
    })
  })
})

###