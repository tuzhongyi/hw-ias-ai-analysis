import { ProcessState } from '../../data-core/enums/process-state.enum';
import { SourceSecurityManager } from '../../data-core/requests/managers/source/source-security.manager';
import { LanguageAbstract } from './language.abstract';

export class LanguageSecurityTool extends LanguageAbstract {
  constructor(private manager: SourceSecurityManager) {
    super();
  }

  async PriorityTypes(value?: ProcessState, def = ''): Promise<string> {
    let values = await this.manager.PriorityTypes.get();
    return this.get(values, value, def);
  }
}
