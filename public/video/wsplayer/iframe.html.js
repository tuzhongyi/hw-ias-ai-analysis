


class WSPlayerIframeController {
  #element = {
    iframe: document.getElementById('iframe'),
    controls: {
      play: document.getElementById('play'),
      stop: document.getElementById('stop'),
      pause: document.getElementById('pause'),
      resume: document.getElementById('resume'),
      fast: document.getElementById('fast'),
      slow: document.getElementById('slow'),
      speed: document.getElementById('speed'),
      frame: document.getElementById('frame'),
    },
    position: {
      ratio: document.getElementById('position_ratio'),
      time: {
        begin: document.getElementById('position_time_begin'),
        end: document.getElementById('position_time_end'),
        current: document.getElementById('position_time_current'),
      },
      seek: {
        value: document.getElementById('seek_value'),
        ok: document.getElementById('seek_ok')
      }
    },
    widget: {
      rule: document.getElementById('rule'),
      sound: {
        enabled: document.getElementById('sound_enabled'),
        value: document.getElementById('sound_value'),
        ok: document.getElementById('sound_ok'),
      },
      subtitle: {
        enabled: document.getElementById(
          'subtitle_enabled'
        ),
        text: document.getElementById('subtitle_text'),
        ok: document.getElementById('subtitle_ok'),
        file: document.getElementById('subtitle_file')
      },
      fullscreen: document.getElementById('fullscreen'),
      capturepicture: document.getElementById(
        'capturepicture'
      ),
    },
    url: {
      preview: {
        input: document.getElementById('preview_input'),
        button: document.getElementById(
          'preview_button'
        ),
      },
      playback: {
        input: document.getElementById('playback_input'),
        button: document.getElementById(
          'playback_button'
        ),
      },
    },
    log: document.getElementById('log'),
  }

  get #path () {
    let path = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
    return `${location.protocol}//${location.host}/${path}/wsplayer.html`
  }
  #name = '测试'
  subtitle = new WSPlayerIframeSubtitle();

  constructor() {
    this.#registiframe()
    this.#registproxy()
    this.#registpreview()
    this.#registplayback()
    this.#reigstwidget()
  }

  #reigstwidget () {
    this.#element.widget.rule.addEventListener('change', () => {
      this.changeRuleState(this.#element.widget.rule.checked)
    })
    this.#element.widget.sound.ok.addEventListener('click', () => {
      if (!this.#element.widget.sound.value.value) return
      let value = parseInt(this.#element.widget.sound.value.value)
      this.#element.widget.sound.enabled.checked = value > 0
      this.setVolume(value)
    })
    this.#element.widget.subtitle.enabled.addEventListener('change', () => {
      this.subtitleEnabled(this.#element.widget.subtitle.enabled.checked)
    })
    this.#element.widget.subtitle.ok.addEventListener('click', () => {
      this.setSubtitle(this.#element.widget.subtitle.text.value)
    })
    this.#element.widget.fullscreen.addEventListener('click', () => {
      this.fullScreen()
    })
    this.#element.widget.capturepicture.addEventListener('click', () => {
      this.capturePicture()
    })
    this.#element.widget.subtitle.file.addEventListener("change", (e) => {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (e) => {
        let content = e.target.result
        this.subtitle.load(0, content)
        this.subtitleEnabled(true)
      }
      reader.readAsText(file)
    })
  }
  #registpreview () {
    this.#element.controls.play.addEventListener('click', () => {
      this.play()
    })
    this.#element.controls.stop.addEventListener('click', () => {
      this.stop()
    })
  }
  #registplayback () {
    this.#element.controls.pause.addEventListener('click', () => {
      this.pause()
    })
    this.#element.controls.resume.addEventListener('click', () => {
      this.resume()
    })
    this.#element.controls.fast.addEventListener('click', () => {
      this.fast()
    })
    this.#element.controls.slow.addEventListener('click', () => {
      this.slow()
    })
    this.#element.controls.speed.addEventListener('click', () => {
      this.speedResume()
    })
    this.#element.controls.frame.addEventListener('click', () => {
      this.frame()
    })
    this.#element.position.seek.ok.addEventListener('click', () => {
      let value = parseFloat(this.#element.position.seek.value.value)
      this.seek(value)
    })
  }
  #registproxy () {
    WSPlayerIframeProxy.event.on('onStoping', (args) => {
      console.log('onStoping', args)
    })
    WSPlayerIframeProxy.event.on('getPosition', (args) => {
      this.#element.position.ratio.innerText = `${(args.value * 100).toFixed(
        2
      )}%`
    })
    WSPlayerIframeProxy.event.on('onPlaying', (args) => {
      console.log('onPlaying', args)
    })
    WSPlayerIframeProxy.event.on('onButtonClicked', (args) => {
      this.#element.log.innerText = `onButtonClicked:${args.value}`
    })
    WSPlayerIframeProxy.event.on('onViewerDoubleClicked', (args) => {
      this.#element.log.innerText = `onViewerDoubleClicked:${args.index}`
    })
    WSPlayerIframeProxy.event.on('onViewerClicked', (args) => {
      this.#element.log.innerText = `onViewerClicked:${args.index}`
    })
    WSPlayerIframeProxy.event.on('onRuleStateChanged', (args) => {
      this.#element.widget.rule.checked = args.value
    })
    WSPlayerIframeProxy.event.on('onStatusChanged', (args) => {
      this.#element.log.innerText = `onStatusChanged:${Language.PlayerState(args.value)}`
    })
    WSPlayerIframeProxy.event.on('getTimer', (args) => {

      let date = new Date(args.value.current)
      this.#element.position.time.current.innerText = `${date.format("HH:mm:ss")}`
      let begin = new Date(args.value.min)
      this.#element.position.time.begin.innerText = `${begin.format("HH:mm:ss")}`
      let end = new Date(args.value.max)
      this.#element.position.time.end.innerText = `${end.format("HH:mm:ss")}`

      if (this.subtitle.enabled) {
        let position = args.value.current - args.value.min;
        let item = this.subtitle.get(args.index, position)
        this.setSubtitle(item ? item.text : "")
      }

    })
    WSPlayerIframeProxy.event.on('onSubtitleEnableChanged', (args) => {
      this.#element.widget.subtitle.enabled.checked = args.value
      this.subtitle.enabled = true;
    })
  }

  #registiframe () {
    this.#element.url.preview.button.addEventListener('click', () => {
      this.#load(this.#path, this.#element.url.preview.input.value, this.#name)
    })

    this.#element.url.playback.button.addEventListener('click', () => {
      this.#load(this.#path, this.#element.url.playback.input.value, this.#name)
    })
    this.#element.iframe.addEventListener('load', () => {
      WSPlayerIframeProxy.set(new WSPlayerProxy(this.#element.iframe))
    })
  }

  #load (path, url, name) {
    let _url = base64encode(url)
    _url = encodeURIComponent(_url)
    let _name = base64encode(name)
    _name = encodeURIComponent(_name)
    this.#element.iframe.src = `${path}?url=${_url}&name=${_name}&index=0`
  }

  async stop () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.stop()
  }
  async play () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.play()
  }
  async seek (value) {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.seek(value)
  }
  async fast () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.fast()
  }
  async slow () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.slow()
  }
  async capturePicture () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.capturePicture()
  }
  async pause () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.pause()
  }
  async speedResume () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.speedResume()
  }
  async resume () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.resume()
  }
  async frame () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.frame()
  }
  async fullScreen () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.fullScreen()
  }
  async resize (width, height) {
    let proxy = await WSPlayerIframeProxy.get()
  }
  async fullExit () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.fullExit()
  }
  async download (filename, type) {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.download(filename, type)
  }
  async openSound () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.openSound()
  }
  async closeSound () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.closeSound()
  }
  async getVolume () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.getVolume()
  }
  async setVolume (value) {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.setVolume(value)
  }
  async subtitleEnabled (value) {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.subtitleEnabled(value)
  }
  async setSubtitle (value) {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.setSubtitle(value)
  }
  async destroy () {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.destroy()
  }
  async changeRuleState (value) {
    let proxy = await WSPlayerIframeProxy.get()
    proxy.changeRuleState(value)
  }
}

const controller = new WSPlayerIframeController()

