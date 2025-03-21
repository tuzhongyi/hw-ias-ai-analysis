import { HowellPoint } from '../../data-core/models/arm/point.model';

export class EqualsTool {
  static Point(p1: HowellPoint, p2: HowellPoint): boolean {
    return p1.X === p2.X && p1.Y === p2.Y;
  }
}
