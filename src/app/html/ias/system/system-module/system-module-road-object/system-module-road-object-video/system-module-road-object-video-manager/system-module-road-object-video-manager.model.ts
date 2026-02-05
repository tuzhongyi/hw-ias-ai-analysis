import { VideoCaptureModel } from '../../../../../../../common/directives/video/video.directive';

export interface PickupModel {
  address?: string;
  capture: VideoCaptureModel;
  position: [number, number];
}
