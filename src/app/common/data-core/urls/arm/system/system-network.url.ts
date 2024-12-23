import { AbstractUrl } from '../../abstract.url'
import { SystemNetworkInterfacesUrl } from './system-network-interface.url'

export class SystemNetworkUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Network`)
  }
  ssh() {
    return `${this.basic()}/SSH`
  }
  capability() {
    return `${this.basic()}/Capability`
  }
  get interface() {
    return new SystemNetworkInterfacesUrl(this.basic())
  }
}
