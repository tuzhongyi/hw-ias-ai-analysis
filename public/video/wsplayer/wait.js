function wait (whether, reject, timepoll = 100) {
  setTimeout(() => {
    if (whether()) {
      reject()
    } else {
      wait(whether, reject, timepoll)
    }
  }, timepoll)
}
