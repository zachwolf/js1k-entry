var sinon  = require('sinon')
	, expect = require('sinon-expect')
							.enhance(require('expect.js'), sinon, 'was')

	, shim   = require('./helpers/vanillaShim')

describe('Arm', function () {
	var Arm, arm

	before(function (done) {
		shim({
			'path': '../src/arm.js',
			'exports': 'Arm'
		}).then(function (shim) {
			Arm = shim
			done()
		})
	})

	beforeEach(function () {
		arm = new Arm()
	})

	describe('#initialize', function () {
		it('should save passed parameters', function () {
			var pivot = '(pivot)'
				, arm = new Arm(pivot)

			expect(arm.pivot).to.equal(pivot)
		})

		it('should set an initial length', function () {
			var arm = new Arm({})

			expect(arm.length).to.not.be(undefined)
		})
	})

	describe('#draw', function () {
		it('should draw the arm to the stage', function () {
			var moveToSpy = sinon.spy(contextStub, 'moveTo')
				, lineToSpy = sinon.spy(contextStub, 'lineTo')
				, rotor = {
						// ...
					}
				, pivot = {
						// ...
					}
				, arm = new Arm()

			arm.draw(contextStub)

			sExpect(moveToSpy).was.called()
			sExpect(lineToSpy).was.called()

			contextStub.moveTo.restore()
			contextStub.lineTo.restore()
		})

		it('should return an instance of itsself', function () {
			var arm = new Arm()

			expect(arm.draw(contextStub) instanceof Arm).to.be(true)
		})
	})

	describe('#transform', function () {
		it('should save new angle', function () {
			var arm = new Arm({})
			var angle = arm.angle

			arm.transform(1)

			expect(arm.angle).to.not.equal(angle)
		})

		it('should return itsself', function () {
			var arm = new Arm({})

			expect(arm.transform() instanceof Arm).to.be(true)
		})
	})
})
