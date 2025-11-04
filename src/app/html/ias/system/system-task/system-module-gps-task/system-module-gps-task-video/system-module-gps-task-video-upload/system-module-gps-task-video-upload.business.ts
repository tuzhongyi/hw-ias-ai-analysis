import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleGpsTaskVideoUploadBusiness {
  constructor(private service: ArmSystemRequestService) {}

  upload(
    filename: string,
    file: ArrayBuffer,
    progress: (value: number) => void
  ) {
    return this.service.file.upload(
      { filename, data: file },
      (value: number) => {
        progress(value);
      }
    );
  }
}
