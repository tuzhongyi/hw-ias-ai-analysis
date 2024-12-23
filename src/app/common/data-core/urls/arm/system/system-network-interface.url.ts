import { AbstractUrl } from '../../abstract.url'

export class SystemNetworkInterfacesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Interfaces`)
  }
}
