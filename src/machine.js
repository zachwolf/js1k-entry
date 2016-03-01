var noop = function () {}

function Machine () {
  this.initialize.apply(this, arguments)
}

/**
 * a group of classes working together to create patterns
 * 
 * @constructor
 * @return {Machine} self reference
 */
Machine.prototype.initialize = function(cntx) {
  this.cntx = cntx

  this.rotorA = new Rotor(100, 100, 50, 1000)
  this.rotorB = new Rotor(400, 300, 100, 3000)

  // this.pivotA = new Pivot(this.rotarA, 0, 40) // rotar, start degrees, offset from center
  // this.pivotb = new Pivot(this.rotarB, 30, 75) // rotar, start degrees, offset from center

  // this.armA = new Arm(this.pivotA, length)
  // this.armb = new Arm(this.pivotB, length)

  // this.stage = new Stage()

  return this
}

/**
 * Checks if a series of numbers a sequential
 *
 * @param {Array} numList - numbers to check order of
 * @return {Boolean} 
 */
Machine.prototype.sequential = function (numList) {  
  var numDirs = numList.map(function (curr, key) {
        return curr !== numList[key+1] ?
          curr < numList[key+1] ? 1 : -1 :
          0
      })
      .slice(0, numList.length-1)
    , state = true

  for (var i = 0; i < numDirs.length-1; i++) {
    if (numDirs[i] !== numDirs[i+1]) {
      state = false
      break
    }
  }

  return state
}

Machine.prototype.draw = function() {
  this.cntx
    .set('strokeStyle', '#000')

  this.rotorA.draw(this.cntx)
  this.rotorB.draw(this.cntx)

  return this
}

/**
 * A spinning object in space
 * @constructor
 */
function Rotor () {
  this.initialize.apply(this, arguments)
}

/**
 * Sets up instance, saves passed parameters
 * 
 * @param  {Number} x - x axis position
 * @param  {Number} y - y axis position
 * @param  {Number} r - rotor radius
 * @return {Rotor}    - self reference
 */
Rotor.prototype.initialize = function (x, y, r, s) {
  this.x = x
  this.y = y
  this.r = r
  this.s = s
  return this
}

Rotor.prototype.draw = function (cntx) {
  cntx
    .beginPath()
    .arc(this.x, this.y, 2, 0, Math.PI * 2)
    .moveTo(this.x + this.r, this.y)
    .arc(this.x, this.y, this.r, 0, Math.PI * 2)
    .closePath()
    .stroke()
}

/**
 * Converts an object's methods to chainable calls
 * 
 * @param {Object} obj - object to be transformed
 */
function Chain (obj) {
  var self = this

  this.obj = obj

  for (var method in obj) {
    if (typeof obj[method] === 'function') {
      this[method] = (function (m) {
        return function () {
          self.obj[m].apply(self.obj, arguments)
          return self
        }
      }(method))
    }
  }
}

/**
 * Chainable interaction with non-functions
 * 
 * @param {String} prop - name of property to be set
 * @param {*} val - value of property
 */
Chain.prototype.set = function (prop, val) {
  this.obj[prop] = val
  return this
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  // exports for testing
  module.exports = {
    Machine: Machine,
    Rotor: Rotor,
    Chain: Chain
  }
} else {
  // app setup for browser
  var machine = new Machine(new Chain(window.c))
  window.machine = machine

  function draw() {
    machine.cntx
      .set('fillStyle', '#fff')
      .rect(0, 0, a.clientWidth, a.clientHeight)
      .fill()

    machine.draw()
    requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
}
