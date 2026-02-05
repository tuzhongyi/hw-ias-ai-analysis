import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';

export class SystemModuleRoadObjectDetailsManagerWindow {
  course = new CourseWindow();
}

class CourseWindow extends WindowViewModel {
  style = {
    width: '400px',
    height: '400px',
  };
  title = '请选择方向（0为正北）';
}
