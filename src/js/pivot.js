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
  cntx
    .beginPath()
    .arc(this.x, this.y, 5, 0, Math.PI * 2)
    .closePath()
    .stroke()

  return this
}

Pivot.prototype.transform = function () {
  this.x = this.rotor.x + this.fromCenter * Math.cos(this.rotor.rotation + this.radians)
  this.y = this.rotor.y + this.fromCenter * Math.sin(this.rotor.rotation + this.radians)

  return this
}