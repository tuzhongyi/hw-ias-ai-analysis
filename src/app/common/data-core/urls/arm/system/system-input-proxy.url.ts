import { AbstractUrl } from '../../abstract.url'
import { SystemInputProxyChannelsUrl } from './system-input-proxy-channel.url'

export class SystemInputProxyUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/InputProxy`)
  }
  capability() {
    return `${this.basic()}/Capability`
  }
  search() {
    return `${this.basic()}/Channels/Search`
  }

  get channel() {
    return new SystemInputProxyChannelsUrl(this.basic())
  }
}
