import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class ManagementSystemDeviceDatetimeNTPSource {
  modes: Promise<EnumNameValue[]>;

  constructor(private manager: Manager) {
    this.modes = this.init.mode();
  }

  private init = {
    mode: () => {
      return new Promise<EnumNameValue[]>((resolve) => {
        this.manager.capability.device.get().then((x) => {
          if (x.NTPTimeMode) {
            resolve(x.NTPTimeMode);
          }
        });
      });
    },
  };
}
