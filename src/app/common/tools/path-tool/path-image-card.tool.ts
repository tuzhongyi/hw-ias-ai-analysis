import { LocalStorage } from '../../storage/local.storage';

export class PathImageCardTool {
  constructor(
    private local?: LocalStorage,
    node: string = '',
  ) {
    this.base = `${node}/assets/image/main/card`;
  }

  private base: string;

  get device() {
    return new CardDeviceTool(this.base);
  }
  get dog() {
    return new CardDogTool(this.base);
  }

  get() {
    if (this.local) {
      let model = this.local.auth.get();
      switch (model.username) {
        case 'putuoqu':
          return this.dog;
        default:
          break;
      }
    }
    return this.device;
  }
}

class CardDeviceTool {
  constructor(private node: string) {}

  get state() {
    return `${this.node}/system-main-card-device-state.png`;
  }
  get icon() {
    return `${this.node}/system-main-card-statistic-item-device.png`;
  }
}
class CardDogTool {
  constructor(private node: string) {}

  get state() {
    return `${this.node}/system-main-card-dog-state.png`;
  }
  get icon() {
    return `${this.node}/system-main-card-statistic-item-dog.png`;
  }
}
