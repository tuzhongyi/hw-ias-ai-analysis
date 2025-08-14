import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementDeviceMobileManagerBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async delete(ids: string[]) {
    let count = 0;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      try {
        await this.service.mobile.device.delete(id);
        count++;
      } catch (error) {
        console.error(error);
      }
    }
    if (count === ids.length) {
      return true;
    }
    throw new Error('部分数据删除失败');
  }

  upload(data: ArrayBuffer, progress: (value: number) => void) {
    return new Promise<void>((resolve, reject) => {
      this.service.mobile.device.excel
        .upload(
          data,
          (value: number) => {
            progress(value);
          },
          () => {
            resolve();
          }
        )
        .catch((e) => {
          reject(e);
        });
    });
  }

  user = {
    group: () => {
      return this.service.security.user.group();
    },
  };
}
