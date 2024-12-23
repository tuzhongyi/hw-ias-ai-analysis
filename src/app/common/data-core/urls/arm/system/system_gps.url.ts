import { AbstractUrl } from '../../abstract.url'

export class SystemGpsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Gps`)
  }
  capability() {
    return `${this.basic()}/Capability`
  }
  config() {
    return `${this.basic()}/Config`
  }
  info() {
    return `${this.basic()}/Info`
  }
}
