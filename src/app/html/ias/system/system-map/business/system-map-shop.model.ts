export class SystemMapShopArgs {
  name?: string;
  telphone?: string;
  type?: number;
  camera?: string;
  label?: number;
  state?: number;
  task?: string[];

  clear() {
    this.name = undefined;
    this.telphone = undefined;
    this.type = undefined;
    this.camera = undefined;
    this.label = undefined;
    this.state = undefined;
  }
}
