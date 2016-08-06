function Timer () {
  this.elapsed = 0
  this.last = null
}

Timer.prototype = {
   tick: function (now) {
     this.elapsed = ((now - this.last) / 1000)
     this.last = now
  },
  fps: function () {
    return 1/this.elapsed
  }
}
