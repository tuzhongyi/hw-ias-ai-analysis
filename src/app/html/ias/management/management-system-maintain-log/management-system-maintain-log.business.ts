import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementSystemMaintainLogBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load(date: Date) {
    let filename = formatDate(date, `yyyyMMdd`, 'en');
    return this.service.data.log.download(filename);
  }

  download(date: Date) {
    let filename = formatDate(date, `yyyyMMdd`, 'en');
    this.load(date).then((data) => {
      let suffix = 'txt';
      let blob = new Blob([data], {
        type: 'text/plain',
      });
      fs.saveAs(blob, `${filename}.${suffix}`);
    });
  }
}
