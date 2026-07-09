import { PatrolSection } from '../../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { SystemModulePatrolSectionManagerComponent } from '../system-module-patrol-section-manager.component';

export class SystemModulePatrolSectionController {
  info: InfoController;
  constructor(that: SystemModulePatrolSectionManagerComponent) {
    this.info = new InfoController(that);
  }
}
class InfoController {
  constructor(private that: SystemModulePatrolSectionManagerComponent) {}
  data?: PatrolSection;
  show = false;
}
