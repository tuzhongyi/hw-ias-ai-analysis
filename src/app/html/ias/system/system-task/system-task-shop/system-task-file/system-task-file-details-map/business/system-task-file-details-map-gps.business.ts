import { Injectable } from '@angular/core';
import { FileGpsItem } from '../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ParseGpsItemParams } from '../../../../../../../../common/data-core/requests/services/system/file/system-file.param';
import { ArmSystemRequestService } from '../../../../../../../../common/data-core/requests/services/system/system.service';
import { ObjectTool } from '../../../../../../../../common/tools/object-tool/object.tool';

@Injectable()
export class SystemTaskFileDetailsMapGPSBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(filename: string, rectified: boolean, precision?: boolean) {
    let datas = await this.data.load(filename, rectified);
    let paths = this.convert(datas);

    if (precision == true) {
      paths = paths.filter((group) => {
        return !!group.every((item) => item.HighPrecision);
      });
    } else if (precision == false) {
      paths = paths.filter((group) => {
        return !group.every((item) => item.HighPrecision);
      });
    } else {
    }
    return paths;
  }

  private convert(datas: FileGpsItem[]) {
    if (!Array.isArray(datas) || datas.length === 0) {
      return [];
    }

    let result = ObjectTool.model.FileGpsItem.split(datas);
    return result;
  }

  private data = {
    load: (filename: string, rectified: boolean) => {
      let params = new ParseGpsItemParams();
      params.FileName = filename;
      params.Rectified = rectified;
      return this.service.file.gps(params);
    },
  };
}
