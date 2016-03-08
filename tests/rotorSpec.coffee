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


###

describe('Rotor', function () {
  describe('#initialize', function () {
    it('should be called immediately', function () {
      var spy = sinon.spy(Rotor.prototype, 'initialize')
      var rotor = new Rotor()

      sExpect(spy).was.called()
    })

    it('should save passed parameters', function () {
      var config = {
        x: 100,
        y: 200,
        r: 300
      }
      var rotor = new Rotor(config.x, config.y, config.r)

      expect(rotor.x).to.equal(config.x)
      expect(rotor.y).to.equal(config.y)
      expect(rotor.radius).to.equal(config.r)
    })

    it('should return itsself', function () {
      expect(new Rotor() instanceof Rotor).to.be(true)
    })
  })

  describe('#draw', function () {
    it('draw itsself to the passed context', function () {
      var x = 1
        , y = 2
        , r = 3
        , rotor = new Rotor(x, y, r)
        , spy = sinon.spy(contextStub, 'arc')

      rotor.draw(contextStub)

      sExpect(spy).was.calledWith(1, 2, 3, 0, Math.PI * 2)

      contextStub.arc.restore()
    })
  })

  describe('#transform', function () {
    it('should increment the rotors rotation', function () {
      var rotor = new Rotor(0, 0, 0, 100)
        , rotorVal = rotor.rotation

      rotor.transform()

      expect(rotorVal).to.not.equal(rotor.rotation)
    })

    it('should calculate distance based on passed speed', function () {
      function round (num) {
        return Math.round(num * 100) / 100
      }

      var rotorA = new Rotor(0, 0, 0, 1000)
        , rotorB = new Rotor(0, 0, 0, 2000)

      rotorA.transform()
      rotorB.transform()

      expect(round(rotorB.rotation)).to.equal(round(rotorA.rotation) / 2)
    })
  })
})

###