import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleShopRegistrationManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}
  async delete(ids: string[]) {
    let count = 0;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      try {
        await this.service.shop.delete(id);
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
      this.service.shop.excel
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
}
