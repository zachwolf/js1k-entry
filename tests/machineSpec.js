var expect  = require('expect.js')
	, sinon   = require('sinon')
	, sExpect = require('sinon-expect').enhance(expect, sinon, 'was')
	, imports = require('../src/machine')
	, Chain   = imports.Chain
	, Machine = imports.Machine
	, Rotor   = imports.Rotor
	, Pivot   = imports.Pivot

	, noop    = function () {}
	, contextStub = new Chain({
			arc: noop,
			rect: noop,
			fill: noop,
			beginPath: noop,
			closePath: noop,
			moveTo: noop,
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
			, rotorDrawSpy
			, pivotDrawSpy

		beforeEach(function () {
			rotorDrawSpy = sinon.spy(Rotor.prototype, 'draw')
			pivotDrawSpy = sinon.spy(Pivot.prototype, 'draw')

			machine = new Machine(contextStub)
		})

		afterEach(function() {
			Rotor.prototype.draw.restore()
			rotorDrawSpy = null

			Pivot.prototype.draw.restore()
			pivotDrawSpy = null

			machine = null
		})

		it('should call draw on all rotors', function () {
			machine.draw(contextStub)

			sExpect(rotorDrawSpy).was.calledTwice()
		})

		it('should call draw on all pivots', function () {
			machine.draw(contextStub)

			sExpect(pivotDrawSpy).was.calledTwice()
		})
	})

	describe('#increment', function() {
		it('should call transform on all rotors', function () {
			var machine = new Machine(contextStub)
				, spy = sinon.spy(Rotor.prototype, 'transform')

			machine.increment()

			sExpect(spy).was.calledTwice()
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
	xdescribe('#initialize', function () {
		xit('should do?')
	})

	xdescribe('#draw', function () {
		it('should draw the rotated pivot point', function () {
			
		})
	})
})

