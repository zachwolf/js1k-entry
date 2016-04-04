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

  this.updateAll()

  return this
}

/**
 * Calculates if the arms have a common possible location
 * 
 * @return {Boolean|Array} - false if no common points, array of two [x, y] points if possible
 */
ArmManager.prototype.getIntersects = function () {
  var r0 = this.armA.length
    , x0 = this.armA.pivot.x
    , y0 = this.armA.pivot.y
    , r1 = this.armB.length
    , x1 = this.armB.pivot.x
    , y1 = this.armB.pivot.y
    , d  = (function () {
        var rise = y0 - y1
          , run  = x0 - x1
      
        return Math.sqrt(sqr(rise) + sqr(run))
      }())
      // check if intersecting
    , intersecting = (function (curDis) {
        return !(curDis > r0 + r1 ||
                 curDis < r0 - r1) &&
               !(r0 === r1 && x0 === x1 && y0 === y1)
      }(d))
  
  if (intersecting) {
    var a   = (sqr(r0) - sqr(r1) + sqr(d)) / (d*2)
      , h   = Math.sqrt(sqr(r0) - sqr(a))
    
        // P2 = P0 + a ( P1 - P0 ) / d
      , x2  = x0 + (a * (x1 - x0)) / d
      , y2  = y0 + (a * (y1 - y0)) / d
    
        // x3 = x2 +- h ( y1 - y0 ) / d
      , x3a = x2 + (h * (y1 - y0)) / d
      , x3b = x2 - (h * (y1 - y0)) / d
    
        // y3 = y2 -+ h ( x1 - x0 ) / d
      , y3a = y2 - (h * (x1 - x0)) / d
      , y3b = y2 + (h * (x1 - x0)) / d
    
    return [
      [x3a, y3a],
      [x3b, y3b]
    ]
  } else {
    return false
  }
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