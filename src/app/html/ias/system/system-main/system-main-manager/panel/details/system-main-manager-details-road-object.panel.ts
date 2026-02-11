import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemMainManagerComponent } from '../../system-main-manager.component';

export class SystemMainManagerPanelRoadObjectDetails {
  show = false;
  data?: RoadObject;

  constructor(private that: SystemMainManagerComponent) {}
  private get window() {
    return this.that.window;
  }

  open(data: RoadObject) {
    this.data = data;
    this.show = true;
  }

  on = {
    picture: (data: RoadObject) => {
      this.window.picture.id = data.ImageUrl;
      this.window.picture.title = `${data.Name}-${data.Address}`;
      this.window.picture.show = true;
    },
  };
}
