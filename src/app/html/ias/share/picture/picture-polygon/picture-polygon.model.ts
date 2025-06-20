import { HowellPoint } from '../../../../../common/data-core/models/arm/point.model';

export class PicturePolygonArgs {
  src?: string;
  id?: string;
  default?: string;
  polygon: HowellPoint[] = [];
}
