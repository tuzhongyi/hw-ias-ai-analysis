class EventEmitter {
  #eventMap = {}
  get keys () {
    let keys = []
    for (const key in this.#eventMap) {
      keys.push(key)
    }
    return keys
  }
  // 添加对应事件的监听函数
  on (eventName, listener) {
    if (!this.#eventMap[eventName]) {
      this.#eventMap[eventName] = []
    }
    this.#eventMap[eventName].push(listener)
    return this
  }

  // 触发事件
  emit (eventName, ...args) {
    const listeners = this.#eventMap[eventName]
    if (!listeners || listeners.length === 0) return false
    listeners.forEach((listener) => {
      listener(...args)
    })
    return true
  }

  // 取消对应事件的监听
  off (eventName, listener) {
    const listeners = this.#eventMap[eventName]
    if (listeners && listeners.length > 0) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
    return this
  }
}
