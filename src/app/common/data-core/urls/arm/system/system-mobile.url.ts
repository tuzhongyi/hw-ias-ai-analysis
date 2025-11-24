import { AbstractUrl } from '../../abstract.url';

export class SystemMobileUrl {
  constructor(private base: string) {}

  get device() {
    return new SystemMobileDeviceUrl(this.base);
  }
}
class SystemMobileDeviceUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/MobileDevices`);
  }

  event = {
    upload: (key: string) => {
      return `${this.item(key)}/EventUpload`;
    },
    ai: {
      descriptor: () => {
        return `${this.basic()}/AIEvents/Descriptors`;
      },
    },
  };

  alive(key: string) {
    return `${this.item(key)}/Alive`;
  }
  excel() {
    return `${this.basic()}/Excels`;
  }
  file = {
    upload: (key: string) => {
      return `${this.item(key)}/FileUpload`;
    },
  };

  get route() {
    return new SystemMobileDeviceRouteUrl(this.basic());
  }
}

class SystemMobileDeviceRouteUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Routes`);
  }

  statistic() {
    return `${this.basic()}/Statistic`;
  }
}
