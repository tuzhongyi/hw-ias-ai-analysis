import { Point } from '../../../../common/data-core/models/arm/point.model';

export class SystemMapShopArgs {
  radius?: SystemMapShopRadiusArgs;
}

export class SystemMapShopRadiusArgs {
  center = Point.create();
  distance = 0;
}
