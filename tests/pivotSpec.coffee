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


###

describe('Pivot', function () {
  describe('#initialize', function () {
    it('should save passed values', function () {
      var rotor = 1
        , radians = 2
        , fromCenter = 3
        , pivot = new Pivot(rotor, radians, fromCenter)

      expect(pivot.rotor).to.equal(rotor)
      expect(pivot.radians).to.equal(radians)
      expect(pivot.fromCenter).to.equal(fromCenter)
    })
  })

  describe('#draw', function () {
    it('should draw the rotated pivot point', function () {
      var rotor = {
            x: 100,
            y: 100,
            rotation: 0
          }
        , arcSpy = sinon.spy(contextStub, 'arc')
        , pivot = new Pivot(rotor, 0, 0)

      pivot.draw(contextStub)

      sExpect(arcSpy).was.called()

      contextStub.arc.restore()
    })
  })

  describe('transform', function () {
    var pivot

    beforeEach(function () {
      pivot = new Pivot({
        x: 0,
        y: 0,
        rotation: 0
      })
    })

    afterEach(function () {
      pivot = null
    })

    it('should update the x and y properties', function () {
      var x = pivot.x
        , y = pivot.y

      pivot.transform()

      expect(x).to.not.equal(pivot.x)
      expect(y).to.not.equal(pivot.y)
    })

    it('should return itsself', function () {
      expect(pivot.transform()).to.be.a(Pivot)
    })
  })
})

###