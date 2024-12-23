import { BaseUrl } from '../../base.url'

export class ArmMediumUrl {
  private static get basic() {
    return `${BaseUrl.arm}/Medium`
  }

  static picture(id: string) {
    return `${this.basic}/Pictures/${id}`
  }
}
