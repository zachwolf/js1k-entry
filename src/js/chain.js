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