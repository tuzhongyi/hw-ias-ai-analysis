import { VideoCaptureModel } from '../../../../../../../common/directives/video/video.directive';

export interface PickupModel {
  address?: string;
  course: number;
  capture: VideoCaptureModel;
  position: [number, number];
}
