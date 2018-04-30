const TimerWorker = function() {
  this.timerID = null
  this.interval = 100

  this.postMessage = (data) => {
    if (data.interval) {
      this.interval = data.interval
      if (this.timerID) {
        clearInterval(this.timerID)
        this.timerID = setInterval(() => {
          this.onmessage('tick')
        }, this.interval)
      }
    } else if (data === 'start') {
      this.timerID = setInterval(() => {
        this.onmessage('tick')
      }, this.interval)
    } else if (data === 'stop') {
      clearInterval(this.timerID)
      this.timerID = null
    }
  }
}

export default TimerWorker
