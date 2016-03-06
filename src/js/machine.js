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

  // rotors
  this.rotorA = new Rotor(100, 100, 50, 1000)
  // this.rotorB = new Rotor(400, 300, 100, 3000)
  this.rotorB = new Rotor(200, 100, 100, 2000)

  // pivots
  this.pivotA = new Pivot(this.rotorA, 0, 40) // rotar, start degrees, offset from center
  // this.pivotB = new Pivot(this.rotorB, (Math.PI * 2) * .5, 75) // rotar, start degrees, offset from center
  this.pivotB = new Pivot(this.rotorB, 0, 40) // rotar, start degrees, offset from center

  // arms
  var armA = new Arm(this.pivotA)
  var armB = new Arm(this.pivotB)

  this.armManager = new ArmManager(armA, armB)

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