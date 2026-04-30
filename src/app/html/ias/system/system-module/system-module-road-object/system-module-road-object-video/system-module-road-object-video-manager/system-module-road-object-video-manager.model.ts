import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { VideoCaptureModel } from '../../../../../../../common/directives/video/video.directive';

export interface PickupModel {
  address?: string;
  course: number;
  capture: VideoCaptureModel;
  objecttype: number;
  type: 'point' | 'line';
}

export interface PickupPointModel extends PickupModel {
  point: [number, number];
}
export interface PickupLineModel extends PickupModel {
  line: [number, number][];
  auto: boolean;
  source?: RoadObject;
}

export class SystemModuleRoadObjectVideoManagerButton {
  enabled = false;
  display = true;
}
