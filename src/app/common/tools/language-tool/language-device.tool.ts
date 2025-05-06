import { ProcessState } from '../../data-core/enums/process-state.enum';
import { SourceDeviceManager } from '../../data-core/requests/managers/source/source-device.manager';
import { LanguageAbstract } from './language.abstract';

export class LanguageDeviceTool extends LanguageAbstract {
  constructor(private manager: SourceDeviceManager) {
    super();
  }

  async ProcessState(value?: ProcessState, def = ''): Promise<string> {
    let values = await this.manager.ProcessStates.get();
    return this.get(values, value, def);
  }
}
