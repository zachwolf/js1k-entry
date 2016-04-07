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
 * 
 * @param  {Arm} armA refernce to an Arm
 * @param  {Arm} armB reference to a second Arm
 * @return {ArmManager}      self reference
 */
ArmManager.prototype.initialize = function (armA, armB) {
  this.armA = armA
  this.armB = armB

  return this
}

/**
 * Calculates if the arms have a common possible location
 * 
 * @return {Boolean|Array} - false if no common points, array of two [x, y] points if possible
 */
ArmManager.prototype.getIntersects = function () {
  return getIntersects({
      r: this.armA.length,
      x: this.armA.pivot.x,
      y: this.armA.pivot.y
    }, {
      r: this.armB.length,
      x: this.armB.pivot.x,
      y: this.armB.pivot.y
    })
}

ArmManager.prototype.updateAll = function () {
  // to find intersecting points...
  var points = this.getIntersects()

  if (points) {
    // todo: find actual point on the canvas
    var point = points[1]

    this.armA.updateRadians(point).transform()
    this.armB.updateRadians(point).transform()
  } else {
    console.log('no possible points with current settings')
  }

  return this
}

ArmManager.prototype.draw = function (cntx) {
  this.armA.draw(cntx)
  this.armB.draw(cntx)

  return this
}