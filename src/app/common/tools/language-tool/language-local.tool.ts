import { LocalCapability } from '../../data-core/requests/managers/enums/enum-capability';

export class LanguageLocalTool {
  private capability = new LocalCapability();
  TaskTypes<T>(value: T): string {
    let item = this.capability.TaskTypes.find((x) => x.Value == value);
    if (item) {
      return item.Name;
    }
    return '';
  }

  SourceTypes<T>(value: T): string {
    let item = this.capability.SourceTypes.find((x) => x.Value == value);
    if (item) {
      return item.Name;
    }
    return '';
  }
}
