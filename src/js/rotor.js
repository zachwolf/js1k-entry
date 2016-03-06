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