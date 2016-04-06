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
  // holder for pub/sub events
  this.events = {}

  this.cntx = cntx

  // rotors
  this.rotorA = new Rotor(100, 100, 50, 1000)
  // this.rotorB = new Rotor(400, 300, 100, 3000)
  this.rotorB = new Rotor(200, 100, 100, 2000)

  // pivots
  this.pivotA = new Pivot(this.rotorA, 0, 40) // rotar, start degrees, offset from center
  this.pivotB = new Pivot(this.rotorB, 0, 40) // rotar, start degrees, offset from center

  // arms
  var armA = new Arm(this.pivotA)
  var armB = new Arm(this.pivotB)

  this.armManager = new ArmManager(armA, armB)

  var self = this

  this.on('start', function () {
    self.armManager.updateAll()
  })

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

  this.armManager.draw(this.cntx)

  return this
}

Machine.prototype.increment = function () {
  this.rotorA.transform()
  this.rotorB.transform()

  this.pivotA.transform()
  this.pivotB.transform()

  this.armManager.updateAll()

  return this
}

/**
 * Subscribe to Machine events
 * @param  {string}   eventName event to be called
 * @param  {Function} callback  event callback
 * @return {Machine}            self reference
 */
Machine.prototype.on = function (eventName, callback) {
  if (this.events[eventName]) {
    this.events[eventName].push(callback)
  } else {
    this.events[eventName] = [callback]
  }

  return this
}

/**
 * Publish Machine events
 * @param  {String} eventName event to be triggered
 * @param  {*} data           optional data to pass to the callback
 * @return {Machine}          self references
 */
Machine.prototype.trigger = function (eventName, data) {
  if (this.events[eventName]) {
    this.events[eventName].forEach(function (cb) {
      cb(data)
    })
  }

  return this
}