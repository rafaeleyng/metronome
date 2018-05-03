const TimerWorker = function TimerWorker() {
  const interval = 25
  let timerID

  this.postMessage = (data) => {
    if (data === 'start') {
      timerID = setInterval(() => {
        this.onmessage('tick')
      }, interval)
      return
    }

    if (data === 'stop') {
      clearInterval(timerID)
      timerID = null
    }
  }
}

export default TimerWorker
