import { BaseUrl } from '../../base.url';

export class ArmMediumUrl {
  private static get basic() {
    return `${BaseUrl.arm}/Medium`;
  }

  static picture = {
    get: (id: string) => {
      return `${this.basic}/Pictures/${id}`;
    },
    upload: () => `${this.basic}/Pictures`,
  };

  static auiio = {
    get: (id: string) => {
      return `${this.basic}/Audios/${id}`;
    },
  };

  static arm(url: string) {
    return `${BaseUrl.arm}/${url}`;
  }
}
