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
  var cx = this.pivot.x
    , cy = this.pivot.y
    , px = endPoint[0]
    , py = endPoint[1]
    , opposite = Math.abs(cy - py)
    , adjacent = Math.abs(cx - px)
    , res

  if (py >= cy) { // below center point
    if (px >= cx) { // right of center point
      res = Math.atan(opposite / adjacent)
    } else { // left of center point
      res = Math.PI - Math.atan(opposite / adjacent)
    }
  } else { // above center point
    if (px >= cx) { // right of center point
      res = Math.PI * 1.5 + Math.asin(opposite / adjacent)
    } else { // left of center point
      res = Math.PI + Math.sin(opposite / adjacent)
    }
  }

  this.angle = res

  return this
}