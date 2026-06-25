import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';

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

  constructor(language: LanguageTool) {
    super();
    this.title = `${language.device.Name}信息`;
  }
}
