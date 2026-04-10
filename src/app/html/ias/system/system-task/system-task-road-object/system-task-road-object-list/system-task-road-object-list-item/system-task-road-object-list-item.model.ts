import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';

export interface ISystemTaskRoadObjectListItem<T = any> {
  title: string;
  data: T;
}
export type RoadItem = RoadObject | RoadPoint | RoadSection;
