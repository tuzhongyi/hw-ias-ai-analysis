import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import { DeviceInfo } from '../../../../common/data-core/models/arm/device-info.model';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementSystemMaintainConfigDataBusiness {
  constructor(private service: ArmSystemRequestService) {}

  private _device?: DeviceInfo;
  private async device() {
    if (!this._device) {
      this._device = await this.service.device.get();
    }
    return this._device;
  }

  download() {
    this.device().then((device) => {
      this.service.data.configuration.download().then((data) => {
        let suffix = 'zip';
        let filename = `${device.SerialNumber}.${suffix}`;
        let blob = new Blob([data], {
          type: 'application/x-zip-compressed',
        });
        fs.saveAs(blob, filename);
      });
    });
  }
}
