export class SystemMapShopArgs {
  name?: string;
  telphone?: string;
  state?: number;

  clear() {
    this.name = undefined;
    this.telphone = undefined;
    this.state = undefined;
  }
}
