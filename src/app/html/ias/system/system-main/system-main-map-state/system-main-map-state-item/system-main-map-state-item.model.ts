export class SystemMainMapStateItem<T extends number> {
  constructor(state: T) {
    this.state = state;
  }
  name: string = '';
  value: number = 0;
  color = '';
  show = true;
  state: T;
}
