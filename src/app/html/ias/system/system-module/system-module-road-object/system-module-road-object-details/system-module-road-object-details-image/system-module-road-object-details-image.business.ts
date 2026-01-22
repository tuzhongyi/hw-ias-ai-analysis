import { Injectable } from '@angular/core';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';

@Injectable()
export class SystemModuleRoadObjectDetailsImageBusiness {
  constructor(private medium: MediumRequestService) {}
  upload(data: ArrayBuffer) {
    return this.medium.upload(data);
  }
  download(id: string) {
    return this.medium.download(id);
  }
  get(id: string) {
    return this.medium.picture(id);
  }
  convert(data: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(data);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/png;base64,${window.btoa(binary)}`;
  }
}
