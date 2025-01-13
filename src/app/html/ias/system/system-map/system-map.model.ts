import { Point } from '../../../../common/data-core/models/arm/point.model';

export class SystemMapShopArgs {
  radius?: SystemMapShopRadiusArgs;
  filter = new SystemMapShopFilterArgs();

  clear() {
    this.filter.clear();
    this.radius = undefined;
  }
}

export class SystemMapShopFilterArgs {
  name?: string;
  state?: number;

  clear() {
    this.name = undefined;
    this.state = undefined;
  }
}

export class SystemMapShopRadiusArgs {
  center = Point.create();
  distance = 0;
}
