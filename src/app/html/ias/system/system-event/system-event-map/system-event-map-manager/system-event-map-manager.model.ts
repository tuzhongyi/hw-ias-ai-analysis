export class SystemEventMapArgs {
  constructor(types: number[] = []) {
    this.types = types;
  }
  date = new Date();
  types: number[] = [];
  type?: number;
  state = [1, 2, 3];
}
