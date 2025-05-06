import { PromiseValue } from '../../../../view-models/value.promise';
import { EnumNameValue } from '../../../models/capabilities/enum-name-value.model';
import { CapabilityManager } from '../capability.manager';

export class SourceDeviceManager {
  NTPServer = new PromiseValue<boolean>();
  NTPTimeMode = new PromiseValue<EnumNameValue[]>();
  RunningStatus = new PromiseValue<boolean>();
  ProcessStates = new PromiseValue<EnumNameValue[]>();
  constructor(private capability: CapabilityManager) {
    this.init();
  }

  private init() {
    this.capability.device.get().then((x) => {
      this.NTPServer.set(x.NTPServer);
      this.RunningStatus.set(x.RunningStatus);
      if (x.NTPTimeMode) {
        this.NTPTimeMode.set(x.NTPTimeMode);
      }
      if (x.ProcessStates) {
        this.ProcessStates.set(x.ProcessStates);
      }
    });
  }
}
