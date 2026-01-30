import { Injectable } from '@angular/core';
import { UploadControlFile } from '../../../../../../../common/components/upload-control/upload-control.model';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleFileUploadBusiness {
  constructor(private service: ArmSystemRequestService) {}

  upload(file: UploadControlFile[]) {}
}
