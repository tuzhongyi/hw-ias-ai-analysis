import { AbstractUrl } from '../../abstract.url'

export class SystemFileUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Files`)
  }

  path(path: string) {
    return this.item(path)
  }

  file(path: string, name: string) {
    return `${this.path(path)}/${name}`
  }

  gps() {
    return `${this.basic()}/GpsItems`
  }
}
