var noop = function () {}

function getFPS (cb) {
  // todo: make actual frame rate checker
  // previous time - this time = frame rate
  // one second / frame rate = frames per second
  return cb(60)
}




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
  // this.rotorB = new Rotor(400, 300, 100, 3000)
  this.rotorB = new Rotor(100, 100, 100, 2000)

  this.pivotA = new Pivot(this.rotorA, 0, 40) // rotar, start degrees, offset from center
  // this.pivotB = new Pivot(this.rotorB, (Math.PI * 2) * .5, 75) // rotar, start degrees, offset from center
  this.pivotB = new Pivot(this.rotorB, 0, 40) // rotar, start degrees, offset from center

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

/**
 * Loops through machine pieces and tells them what to draw
 * 
 * @return {Machine} 
 */
Machine.prototype.draw = function() {
  this.cntx
    .set('strokeStyle', '#000')

  this.rotorA.draw(this.cntx)
  this.rotorB.draw(this.cntx)

  this.pivotA.draw(this.cntx)
  this.pivotB.draw(this.cntx)

  return this
}

Machine.prototype.increment = function () {

  this.rotorA.transform()
  this.rotorB.transform()

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
 * @param  {Number} s - rotation speed
 * @return {Rotor}    - self reference
 */
Rotor.prototype.initialize = function (x, y, r, s) {
  this.x = x
  this.y = y
  this.radius = r
  this.speed = s
  this.rotation = 0

  return this
}

Rotor.prototype.draw = function (cntx) {
  cntx
    .beginPath()
    .arc(this.x, this.y, 2, 0, Math.PI * 2)
    .moveTo(this.x + this.radius, this.y)
    .arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    .closePath()
    .stroke()
}

Rotor.prototype.transform = function() {
  // calculate distance of circle based on passed speed
  // 
  // frames per second / 2PI = rotation distance per frame
  // this.speed / 1000ms = rotations per second
  // this.rotation = this.rotation + rotation distance per frame / rotations per second

  var oneRPS = getFPS(function (fps) {
        return Math.PI * 2 / fps
      })
    , increment = oneRPS / (this.speed / 1000)

  this.rotation = this.rotation + increment
  return this
}




/**
 * Pivots serve as a single moving point on a Rotor
 * @constructor
 */
function Pivot () {
  this.initialize.apply(this, arguments)
}

/**
 * set up class - save reference to passed values
 * 
 * @param  {Rotor} rotor      rotor this pivot instance lives on
 * @param  {Number} radians    starting offset (range 0 to 2PI)
 * @param  {Number} fromCenter distance from the center of the rotor
 * @return {Pivot}            self reference
 */
Pivot.prototype.initialize = function(rotor, radians, fromCenter) {
  this.rotor = rotor
  this.radians = radians
  this.fromCenter = fromCenter

  return this
}

Pivot.prototype.draw = function(cntx) {
  var x = this.rotor.x + this.fromCenter * Math.cos(this.rotor.rotation + this.radians)
    , y = this.rotor.y + this.fromCenter * Math.sin(this.rotor.rotation + this.radians)

  cntx
    .beginPath()
    .arc(x, y, 5, 0, Math.PI * 2)
    .closePath()
    .stroke()

  return this
}




/**
 * An Arm is used to find a point in space between
 * it's pivotand it's length
 * 
 * @constructor
 */
function Arm() {
  this.initialize.apply(this, arguments)
}

/**
 * class setup - saves passed parameters
 * @param  {Pivot} pivot - point to move from
 * @return {Arm}       self reference
 */
Arm.prototype.initialize = function (pivot) {
  this.pivot = pivot

  return this
}

Arm.prototype.draw = function (cntx) {
  cntx
    .beginPath()
    .moveTo(500, 500)
    .lineTo(505, 505)
    .closePath()
    .stroke()

  return this
}

Arm.prototype.transform = function () {

}



/**
 * ArmManagers serves as a way to have multiple separate arms
 * that don't have to be aware of eachother
 *
 * @constructor
 */
function ArmManager () {
  this.initialize.apply(this, arguments)
}

/**
 * class setup - save passed params
 * @param  {Arm} armA refernce to an Arm
 * @param  {Arm} armB reference to a second Arm
 * @return {ArmManager}      self reference
 */
ArmManager.prototype.initialize = function (armA, armB) {

}

ArmManager.prototype.increment = function () {}



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
    Chain: Chain,
    Pivot: Pivot,
    Arm: Arm,
    ArmManager: ArmManager
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

    machine
      .increment()
      .draw()
    // requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
}
