import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UploadControlFile } from '../../../../../components/upload-control/upload-control.model';
import { FileGpsItem } from '../../../../models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../models/arm/file/file-info.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { ParseGpsItemParams } from './system-file.param';

export class SystemFileRequestService {
  constructor(private http: HowellHttpClient) {}
  async array() {
    let url = ArmSystemUrl.file.basic();
    let response = await this.http.get<HowellResponse<FileInfo[]>>(url);
    if (response.FaultCode === 0) {
      return plainToInstance(FileInfo, response.Data);
    }
    throw new Error(response.FaultReason);
  }
  async upload(file: UploadControlFile, progress: (x: number) => void) {
    let data = this.uploadconvert(file);
    let url = ArmSystemUrl.file.basic();
    return this.http
      .upload<FormData, HowellResponse<FileInfo>>(url, data, {
        process: progress,
      })
      .then((x) => {
        return HowellResponseProcess.item(x, FileInfo);
      });
  }
  private uploadconvert(file: UploadControlFile): FormData {
    let form = document.createElement('form') as HTMLFormElement;
    form.name = file.filename;
    let data = new FormData(form);
    let blob = new Blob([file.data as ArrayBuffer], {
      type: 'video/x-matroska',
    });
    data.append('file', blob, file.filename);
    return data;
  }

  async folder(path: string) {
    let url = ArmSystemUrl.file.path(path);
    let response = await this.http.get<HowellResponse<FileInfo[]>>(url);
    if (response.FaultCode === 0) {
      return plainToInstance(FileInfo, response.Data);
    }
    throw new Error(response.FaultReason);
  }
  async file(path: string) {
    let url = ArmSystemUrl.file.path(path);
    return this.http.get<any>(url);
  }
  path(path: string) {
    return ArmSystemUrl.file.path(path);
  }

  async gps(params: ParseGpsItemParams) {
    let url = ArmSystemUrl.file.gps();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<FileGpsItem[]>, any>(url, plain)
      .then((response) => {
        return HowellResponseProcess.array(response, FileGpsItem);
      });
  }
}
