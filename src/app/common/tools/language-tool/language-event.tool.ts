import { SourceEventManager } from '../../data-core/requests/managers/source/source-event.manager';
import { LanguageAbstract } from './language.abstract';

export class LanguageEventTool extends LanguageAbstract {
  constructor(private manager: SourceEventManager) {
    super();
  }
  /** 资源类型 */
  async ResourceType(value?: number, def = ''): Promise<string> {
    let values = await this.manager.ResourceTypes.get();
    return this.get(values, value, def);
  }
  /** 事件类型 */
  async EventType(value?: number, def = ''): Promise<string> {
    let values = await this.manager.EventTypes.get();
    return this.get(values, value, def);
  }
  /** 触发类型 */
  async TriggerType(value?: number, def = ''): Promise<string> {
    let values = await this.manager.TriggerTypes.get();
    return this.get(values, value, def);
  }
  /** 突发情况分类 */
  async EmergencyType(value?: number, def = ''): Promise<string> {
    let values = await this.manager.EmergencyTypes.get();
    return this.get(values, value, def);
  }
}
