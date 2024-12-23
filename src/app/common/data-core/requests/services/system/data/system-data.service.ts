import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';

export class SystemDataRequestService {
  constructor(private http: HowellHttpClient) {}

  configuration = {
    download: () => {
      let url = ArmSystemUrl.data.configuration();
      return this.http.get<Blob>(url, {
        params: {
          responseType: 'blob',
        },
      });
    },
    upload: (data: BinaryData) => {
      let url = ArmSystemUrl.data.configuration();
      return this.http
        .post<HowellResponse, BinaryData>(url, data, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then((x) => {
          return x.FaultCode == 0;
        });
    },
  };
  log = {
    download: (filename: string) => {
      let url = ArmSystemUrl.data.log(filename);
      return this.http.get<string>(url);
    },
  };
}
