function waiting(whether: () => boolean, resolve: () => void, interval = 100) {
  setTimeout(() => {
    if (whether()) {
      resolve();
    } else {
      waiting(whether, resolve, interval);
    }
  }, interval);
}
export function wait(
  this: any,
  whether: () => boolean,
  args?: {
    interval?: number;
    timeout?: number;
    timeoutable?: boolean;
  }
) {
  let opts = {
    interval: 10,
    timeout: 1000 * 1 * 60,
    timeoutable: false,
  };
  opts = {
    ...opts,
    ...args,
  };

  return new Promise<void>((resolve, reject) => {
    let stop = false;
    waiting(
      () => {
        return whether() || stop;
      },
      () => {
        if (stop) {
          console.warn('wait2 timeout', this);
          reject();
        } else {
          resolve();
        }
      },
      opts.interval
    );
    if (opts.timeoutable && opts.timeout) {
      setTimeout(() => {
        stop = true;
      }, opts.timeout);
    }
  });
}
