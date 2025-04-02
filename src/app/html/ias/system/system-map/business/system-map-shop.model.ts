export class SystemMapShopArgs {
  name?: string;
  telphone?: string;
  type?: number;
  camera?: string;
  label?: number;
  state?: number;
  task?: SystemMapTaskShopArgs;

  clear() {
    this.name = undefined;
    this.telphone = undefined;
    this.type = undefined;
    this.camera = undefined;
    this.label = undefined;
    this.state = undefined;
    this.task = undefined;
  }
}
export class SystemMapTaskShopArgs {
  ids: string[] = [];
  base?: string[];
}
