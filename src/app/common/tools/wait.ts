export function wait(
  whether: () => boolean,
  reject: () => void,
  timepoll = 100
) {
  setTimeout(() => {
    if (whether()) {
      reject()
    } else {
      wait(whether, reject, timepoll)
    }
  }, timepoll)
}
