import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceServerManager {
  TaskTypes = new PromiseValue<EnumNameValue<number>[]>();
  TaskStates = new PromiseValue<EnumNameValue<number>[]>();
  VideoSourceProtocolTypes = new PromiseValue<EnumNameValue[]>();
  VideoSourceModes = new PromiseValue<EnumNameValue[]>();
  SourceTypes = new PromiseValue<EnumNameValue<number>[]>();

  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.analysis.server.get().then((x) => {
      if (x.TaskTypes) {
        this.TaskTypes.set(x.TaskTypes);
      }
      if (x.TaskStates) {
        this.TaskStates.set(x.TaskStates);
      }
      if (x.VideoSourceProtocolTypes) {
        this.VideoSourceProtocolTypes.set(x.VideoSourceProtocolTypes);
      }
      if (x.VideoSourceModes) {
        this.VideoSourceModes.set(x.VideoSourceModes);
      }
      if (x.SourceTypes) {
        this.SourceTypes.set(x.SourceTypes);
      }
    });
  }
}
