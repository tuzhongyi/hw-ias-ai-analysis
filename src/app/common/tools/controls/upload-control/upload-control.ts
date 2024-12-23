import { EventEmitter } from '../../../event-emitter'
import { UploadControlEventArgs } from './upload-control.event'
import './upload-control.less'
import { FileReadType } from './upload-control.model'

export class UploadControl {
  private _accept?: string
  public get accept(): string | undefined {
    return this._accept
  }
  public set accept(v: string | undefined) {
    this._accept = v
    this.file.accept = v ?? ''
  }
  private _multiple = false
  public get multiple(): boolean {
    return this._multiple
  }
  public set multiple(v: boolean) {
    this._multiple = v
    this.file.multiple = v
  }

  type: FileReadType = FileReadType.DataURL
  encoding?: string
  event: EventEmitter<UploadControlEventArgs> = new EventEmitter()

  constructor(private button: HTMLElement, private file: HTMLInputElement) {
    this.init()
    this.regist()
  }

  private init() {
    this.file.multiple = this.multiple
  }

  private regist() {
    this.button.addEventListener('click', () => {
      this.file.click()
    })
    this.file.addEventListener('change', () => {
      this.fileChange()
    })
  }

  private fileChange() {
    if (this.file) {
      const t_files = this.file.files

      let infos = []

      if (t_files && t_files.length > 0) {
        for (let i = 0; i < t_files.length; i++) {
          let name = t_files[i].name
          this.uploadFile(name, t_files[i])
          infos.push({ filename: t_files[i].name })
        }
        this.file.value = ''
      }
    }
  }

  private async uploadFile(name: string, file: any) {
    var reader = new FileReader()
    reader.addEventListener('loadstart', (evt) => {
      this.event.emit('loadstart', {
        filename: name,
      })
    })
    reader.addEventListener('load', (evt) => {
      let reader = evt.target as FileReader
      this.event.emit('upload', {
        filename: name,
        data: reader.result,
      })
    })
    switch (this.type) {
      case FileReadType.ArrayBuffer:
        reader.readAsArrayBuffer(file)
        break
      case FileReadType.BinaryString:
        reader.readAsBinaryString(file)
        break
      case FileReadType.DataURL:
        reader.readAsDataURL(file)
        break
      case FileReadType.Text:
        reader.readAsText(file, this.encoding)
        break

      default:
        break
    }
  }
}
