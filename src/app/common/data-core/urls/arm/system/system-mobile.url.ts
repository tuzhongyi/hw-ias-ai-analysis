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

  statements() {
    return `${this.basic()}/Statements`;
  }

  get route() {
    return new SystemMobileDeviceRouteUrl(this.basic());
  }

  proxy = {
    channel: (deviceId: string) => {
      return `${this.item(deviceId)}/ProxyChannels`;
    },
  };

  preview = {
    url: () => {
      return `${this.basic()}/PreviewUrls`;
    },
    start: () => {
      return `${this.basic()}/StartPreview`;
    },
    stop: () => {
      return `${this.basic()}/StopPreview`;
    },
  };
  vod = {
    url: () => {
      return `${this.basic()}/VodUrls`;
    },
    start: () => {
      return `${this.basic()}/StartVod`;
    },
    stop: () => {
      return `${this.basic()}/StopVod`;
    },
  };
}

class SystemMobileDeviceRouteUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Routes`);
  }

  statistic() {
    return `${this.basic()}/Statistic`;
  }
}
