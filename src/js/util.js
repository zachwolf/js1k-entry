var noop = function () {}

function getFPS (cb) {
  // todo: make actual frame rate checker
  // previous time - this time = frame rate
  // one second / frame rate = frames per second
  return cb(60)
}

function sqr (_n) {
  return _n * _n
}

/**
 * MATH!
 * This bad-boy find intersecting points between two circles
 * The circles must have `r` (radius) and `x`, `y` coordinates
 * 
 * @param  {Object} c0   circle
 * @param  {Number} c0.r radius for circle
 * @param  {Number} c0.x circle's x position
 * @param  {Number} c0.y circle's y position
 * @param  {Object} c1   circle
 * @param  {Number} c1.r radius for circle
 * @param  {Number} c1.x circle's x position
 * @param  {Number} c1.y circle's y position
 * @return {Array|Boolean} returns an array with two intersecting points if possible,
 *                         otherwise it returns false
 */
function getIntersects (c0, c1) {	
  var d  = (function (rise, run) {
        return Math.sqrt(sqr(rise) + sqr(run))
      }(c0.y - c1.y, c0.x - c1.x))
      // check if intersecting
    , intersecting = (function (curDis) {
        return !(curDis > c0.r + c1.r ||
                 curDis < c0.r - c1.r) &&
               !(c0.r === c1.r && c0.x === c1.x && c0.y === c1.y)
      }(d))
  
  if (intersecting) {
    var a   = (sqr(c0.r) - sqr(c1.r) + sqr(d)) / (d*2)
      , h   = Math.sqrt(sqr(c0.r) - sqr(a))
    
        // P2 = P0 + a ( P1 - P0 ) / d
      , x2  = c0.x + (a * (c1.x - c0.x)) / d
      , y2  = c0.y + (a * (c1.y - c0.y)) / d
    
        // x3 = x2 +- h ( c1.y - c0.y ) / d
      , x3a = x2 + (h * (c1.y - c0.y)) / d
      , x3b = x2 - (h * (c1.y - c0.y)) / d
    
        // y3 = y2 -+ h ( c1.x - c0.x ) / d
      , y3a = y2 - (h * (c1.x - c0.x)) / d
      , y3b = y2 + (h * (c1.x - c0.x)) / d
    
    return [
      [x3a, y3a],
      [x3b, y3b]
    ]
  } else {
    return false
  }
}
