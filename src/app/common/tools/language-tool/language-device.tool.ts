import { ProcessState } from '../../data-core/enums/process-state.enum';
import { SourceDeviceManager } from '../../data-core/requests/managers/source/source-device.manager';
import { LocalStorage } from '../../storage/local.storage';
import { LanguageAbstract } from './language.abstract';

export class LanguageDeviceTool extends LanguageAbstract {
  constructor(
    private manager: SourceDeviceManager,
    private local: LocalStorage,
  ) {
    super();
  }

  async ProcessState(value?: ProcessState, def = ''): Promise<string> {
    let values = await this.manager.ProcessStates.get();
    return this.get(values, value, def);
  }

  get Name() {
    if (this.local.auth.is.putuoqu) {
      return '机器狗';
    }
    return '巡逻车';
  }
}
