import { SourceEventManager } from '../../data-core/requests/managers/source/source-event.manager';
import { LanguageAbstract } from './language.abstract';

export class LanguageEventTool extends LanguageAbstract {
  constructor(private manager: SourceEventManager) {
    super();
  }

  async ResourceType(value?: number, def = ''): Promise<string> {
    let values = await this.manager.ResourceTypes.get();
    return this.get(values, value, def);
  }
  async EventType(value?: number, def = ''): Promise<string> {
    let values = await this.manager.EventTypes.get();
    return this.get(values, value, def);
  }
  async TriggerType(value?: number, def = ''): Promise<string> {
    let values = await this.manager.TriggerTypes.get();
    return this.get(values, value, def);
  }
}
