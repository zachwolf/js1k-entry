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

  this.length = 200

  return this
}

Arm.prototype.draw = function (cntx) {
  cntx
    .set('strokeStyle', '#BEEFED')
    .beginPath()
    .moveTo(this.pivot.x, this.pivot.y)
    .lineTo(this.x, this.y)
    .closePath()
    .stroke()
    .set('strokeStyle', '#BEFA11')
    .beginPath()
    .arc(this.pivot.x, this.pivot.y, this.length, 0, Math.PI * 2)
    .closePath()
    .stroke()

  return this
}

Arm.prototype.transform = function () {
  this.x = this.pivot.x + this.length * Math.cos(this.angle)
  this.y = this.pivot.y + this.length * Math.sin(this.angle)

  return this
}

/**
 * Gets the radians from 0 to the given end point
 * @param  {[type]} endPoint [description]
 * @return {[type]}          [description]
 */
Arm.prototype.updateRadians = function (endPoint) {
  // debugger
  return this
}