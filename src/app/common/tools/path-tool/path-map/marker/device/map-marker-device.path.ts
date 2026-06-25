export class MapMarkerDevicePath {
  constructor(path: string) {
    this.basic = `${path}/marker-device`;
  }

  private basic: string;
  get online() {
    return `${this.basic}-mobile-online.png`;
  }

  get offline() {
    return `${this.basic}-mobile-offline.png`;
  }
}
