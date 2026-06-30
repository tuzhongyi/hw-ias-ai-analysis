import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';

export class SystemMainManagerMobileDeviceWindow extends WindowViewModel {
  style = {
    width: '100%',
    height: 'calc(100% - 108px)',
    position: 'absolute',
    top: '108px',
    left: 0,
    paddingTop: 0,
    border: 'none',
    boxShadow: 'none',
    transform: 'none',
  };
  title = '';

  constructor() {
    super();
    this.title = `${Language.DeviceName}信息`;
  }
}
