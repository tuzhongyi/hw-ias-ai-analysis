import { IMapMarkerPath } from './map-marker.interface';

export abstract class MapMarkerPathAbstract implements IMapMarkerPath {
  constructor(base: string) {
    this.basic = `${base}`;
  }

  protected basic: string;

  get normal() {
    return `${this.basic}.png`;
  }
  get selected() {
    return `${this.basic}-selected.png`;
  }
  get hover() {
    return `${this.basic}-hover.png`;
  }
}

export class MapMarkerPathInstance extends MapMarkerPathAbstract {
  constructor(path: string) {
    super(`${path}`);
  }
}
