export class MapMarkerDogPath {
  constructor(path: string) {
    this.basic = `${path}/marker-dog`;
  }

  private basic: string;

  get online() {
    return `${this.basic}-online.png`;
  }

  get offline() {
    return `${this.basic}-offline.png`;
  }
}
