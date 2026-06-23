

class WSPlayerIframeProxy {
  static #_proxy
  static get () {
    return new Promise((resolve) => {
      wait(
        () => {
          return !!this.#_proxy
        },
        () => {
          if (this.#_proxy) {
            resolve(this.#_proxy)
          }
        }
      )
    })
  }
  static set (value) {
    this.#_proxy = value
    this.#regist(this.#_proxy)
  }

  static event = new EventEmitter()

  static #regist (proxy) {
    proxy.onStoping = (index) => {
      let a = [];
      a.unshift
      this.event.emit('onStoping', { index })
    }
    proxy.getPosition = (index, value) => {
      this.event.emit('getPosition', { index, value })
    }
    proxy.onPlaying = (index) => {
      this.event.emit('onPlaying', { index })
    }
    proxy.onButtonClicked = (index, value) => {
      this.event.emit('onButtonClicked', { index, value })
    }
    proxy.onViewerDoubleClicked = (index) => {
      this.event.emit('onViewerDoubleClicked', { index })
    }
    proxy.onViewerClicked = (index) => {
      this.event.emit('onViewerClicked', { index })
    }
    proxy.onRuleStateChanged = (index, value) => {
      this.event.emit('onRuleStateChanged', { index, value })
    }
    proxy.onStatusChanged = (index, value) => {
      this.event.emit('onStatusChanged', { index, value })
    }
    proxy.getTimer = (index, value) => {
      this.event.emit('getTimer', { index, value })
    }
    proxy.onSubtitleEnableChanged = (index, enabled) => {
      this.event.emit('onSubtitleEnableChanged', { index, enabled })
    }
  }
}

