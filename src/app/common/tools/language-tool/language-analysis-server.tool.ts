import { SourceServerManager } from '../../data-core/requests/managers/source/source-server.manager';
import { LanguageAbstract } from './language.abstract';

export class LanguageAnalysisServerTool extends LanguageAbstract {
  constructor(private manager: SourceServerManager) {
    super();
  }

  async TaskType(value?: number, def = ''): Promise<string> {
    let values = await this.manager.TaskTypes.get();
    return this.get(values, value, def);
  }
  async TaskState(value?: number, def: string = ''): Promise<string> {
    let values = await this.manager.TaskStates.get();
    return this.get(values, value, def);
  }
}
