import { SystemTaskFileDetailsAMapPickupLineCreationController } from './system-task-file-details-amap-pickup-line-creation.controller';

export class SystemTaskFileDetailsAMapPickupLineController {
  creation: SystemTaskFileDetailsAMapPickupLineCreationController;

  constructor(map: AMap.Map) {
    this.creation = new SystemTaskFileDetailsAMapPickupLineCreationController(
      map
    );
  }
}
