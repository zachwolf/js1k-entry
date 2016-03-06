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