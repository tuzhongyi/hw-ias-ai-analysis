import { Point } from '../../../../common/data-core/models/arm/point.model';
import { SystemMapShopRadiusArgs } from './system-map.model';

export class SystemMapPanel {
  state = new StatePanel();
  position = new PositionPanel();

  editor = {
    circle: new CircleEditorPanel(),
  };
}
class Panel {
  show = false;
}
class StatePanel extends Panel {
  override show = true;
}
class CircleEditorPanel extends Panel {
  args = new SystemMapShopRadiusArgs();
}
class PositionPanel extends Panel {
  point = new Point();
}
