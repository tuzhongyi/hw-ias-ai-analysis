import { Injectable } from '@angular/core';
import { ResultLabelType } from '../../../../../common/data-core/enums/analysis/result-label-type.enum';
import { SignType } from '../../../../../common/data-core/enums/analysis/sign-type.enum';
import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { EnumTool } from '../../../../../common/tools/enum-tool/enum.tool';

@Injectable()
export class SystemTaskResultTableManagerSourceController {
  constructor() {
    this.types = EnumTool.values(SignType);
    this.labels = EnumTool.values(ResultLabelType);
  }

  channels = [1, 2, 3, 4];
  types: number[];
  labels: number[];
  datas: ShopSign[] = [];

  filter(channel?: string, type?: number, label?: number, shopId?: string) {
    return this.datas.filter((x) => {
      if (channel != undefined && x.CameraNo != channel) {
        return false;
      }
      if (type != undefined && x.SignType != type) {
        return false;
      }
      if (label != undefined && x.ResultLabelType != label) {
        return false;
      }
      if (shopId != undefined && x.ShopId != shopId) {
        return false;
      }
      return true;
    });
  }
}
