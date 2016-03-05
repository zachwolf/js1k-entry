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

describe('Chain', function () {
	describe('#initialize', function () {
		it('should call original methods', function () {
			var spy = sinon.spy(noop)
				, obj = new Chain({
						fn: spy
					})

			obj.fn()

			sExpect(spy).was.called()
		})

		it('should return itsself', function () {
			var obj = new Chain({
				fn: noop,
				foo: noop,
				bar: noop
			})

			expect(obj.fn().foo().bar() instanceof Chain).to.be(true)
		})
	})

	describe('#set', function () {
		it('should update the original objects value', function () {
			var obj = {
						val: 'foo'
					}
				, chain = new Chain(obj)

			chain.set('val', 'bar')

			expect(obj.val).to.equal('bar')
		})

		it('should return itsself', function () {
			var obj = new Chain({
				val: 'foo'
			})

			expect(obj.set('val', 'bar') instanceof Chain).to.be(true)
		})
	})
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

describe('Arm', function () {
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

