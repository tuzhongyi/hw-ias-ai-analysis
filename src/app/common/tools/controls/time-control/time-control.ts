import '../../../../../assets/styles/datetime.less'
import { EventEmitter } from '../../../event-emitter'
import { TimeControlEvent } from './time-control.event'
export class TimeControl {
  constructor(private parent: HTMLElement) {
    this.init()
    this.regist()
  }

  public event = new EventEmitter<TimeControlEvent>()
  public get element() {
    return this.parent
  }

  private _time: Date = new Date()
  public get time(): Date {
    return this._time
  }
  public set time(v: Date) {
    this._time = v
    this.reload()
    this.event.emit('change', this)
  }

  public get hour(): number {
    return this.time.getHours()
  }
  public set hour(v: number) {
    this.time.setHours(v)
    this.reload()
    this.event.emit('change', this)
  }
  public get minute(): number {
    return this.time.getMinutes()
  }
  public set minute(v: number) {
    this.time.setMinutes(v)
    this.reload()
    this.event.emit('change', this)
  }
  public get second(): number {
    return this.time.getSeconds()
  }
  public set second(v: number) {
    this.time.setSeconds(v)
    this.reload()
    this.event.emit('change', this)
  }

  private set(value: number) {
    return value.toString().padStart(2, '0')
  }

  private _element = {
    hour: document.createElement('input'),
    minute: document.createElement('input'),
    second: document.createElement('input'),
  }

  private init() {
    if (!this.parent.classList.contains('datetime-time')) {
      this.parent.classList.add('datetime-time')
    }

    this.initHour()
    this.initColon()
    this.initMinute()
    this.initColon()
    this.initSecond()
    this.reload()
  }

  private initColon() {
    let span = document.createElement('span')
    let i = document.createElement('i')
    i.className = 'howell-icon-colon'
    span.appendChild(i)
    this.parent.appendChild(span)
  }

  private initHour() {
    this._element.hour.type = 'number'
    this._element.hour.min = '0'
    this._element.hour.max = '23'
    this._element.hour.className = 'datetime-time-h'
    let span = document.createElement('span')
    span.appendChild(this._element.hour)
    this.parent.appendChild(span)
  }
  private initMinute() {
    this._element.minute.type = 'number'
    this._element.minute.min = '0'
    this._element.minute.max = '59'
    this._element.minute.className = 'datetime-time-m'
    let span = document.createElement('span')
    span.appendChild(this._element.minute)
    this.parent.appendChild(span)
  }
  private initSecond() {
    this._element.second.type = 'number'
    this._element.second.min = '0'
    this._element.second.max = '59'
    this._element.second.className = 'datetime-time-s'
    let span = document.createElement('span')
    span.appendChild(this._element.second)
    this.parent.appendChild(span)
  }

  private reload() {
    this._element.hour.value = this.set(this.time.getHours())
    this._element.minute.value = this.set(this.time.getMinutes())
    this._element.second.value = this.set(this.time.getSeconds())
  }

  private regist() {
    this._element.hour.addEventListener('click', (e) => {
      this.onclick(e)
    })
    this._element.minute.addEventListener('click', (e) => {
      this.onclick(e)
    })
    this._element.second.addEventListener('click', (e) => {
      this.onclick(e)
    })
    this._element.hour.addEventListener('input', (e) => {
      this.hour = this.oninput(e)
    })
    this._element.minute.addEventListener('input', (e) => {
      this.minute = this.oninput(e)
    })
    this._element.second.addEventListener('input', (e) => {
      this.second = this.oninput(e)
    })

    this._element.hour.addEventListener('mousewheel', (e) => {
      let event = e as WheelEvent
      if (event.deltaY > 0) {
        this.hour++
      } else {
        this.hour--
      }
    })
    this._element.minute.addEventListener('mousewheel', (e) => {
      let event = e as WheelEvent
      if (event.deltaY > 0) {
        this.minute++
      } else {
        this.minute--
      }
    })
    this._element.second.addEventListener('mousewheel', (e) => {
      let event = e as WheelEvent
      if (event.deltaY > 0) {
        this.second++
      } else {
        this.second--
      }
    })
  }

  private oninput(e: Event) {
    let element = e.target as HTMLInputElement
    let value = parseInt(element.value)
    element.value = value.toString().padStart(2, '0')
    element.value = element.value.substring(0, 2)
    return parseInt(element.value)
  }
  private onclick(e: Event) {
    let element = e.target as HTMLInputElement
    element.focus()
    element.select()
  }
}
