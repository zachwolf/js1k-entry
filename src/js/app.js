var machine = new Machine(new Chain(window.c))
window.machine = machine

var limit = 5

function draw() {
  if (!limit--) {
    return
  }

  machine.cntx
    .set('fillStyle', '#fff')
    .rect(0, 0, a.clientWidth, a.clientHeight)
    .fill()

  machine
    .increment()
    .draw()
  // requestAnimationFrame(draw)
}

requestAnimationFrame(draw)