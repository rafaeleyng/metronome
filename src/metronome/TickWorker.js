const STOPPED = 0
const RUNNING = 1

const TickWorker = function TickWorker() {
  const interval = 25
  let timerID
  let status = STOPPED

  this.postMessage = (data) => {
    if (data === 'start') {
      status = RUNNING

      timerID = setInterval(() => {
        if (status === STOPPED) {
          return
        }

        if (this.onmessage) {
          this.onmessage('tick')
        }
      }, interval)

      return
    }

    if (data === 'stop') {
      status = STOPPED
      clearInterval(timerID)
      timerID = null
    }
  }
}

export default TickWorker
