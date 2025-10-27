import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../tools/service-tool/service.tool';
import { AbstractService } from '../../../../cache/cache.interface';
import { GpsTaskSampleRecord } from '../../../../models/arm/analysis/llm/gps-task-sample-record.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmAnalysisUrl } from '../../../../urls/arm/analysis/analysis.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { GetAnalysisGpsTaskSampleListParams } from './analysis-llm.params';

export class ArmAnalysisLLMGpsTaskSampleRequestService extends AbstractService<GpsTaskSampleRecord> {
  constructor(private http: HowellHttpClient) {
    super();
  }
  override all(
    params: GetAnalysisGpsTaskSampleListParams
  ): Promise<GpsTaskSampleRecord[]> {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  override async list(
    params = new GetAnalysisGpsTaskSampleListParams()
  ): Promise<PagedList<GpsTaskSampleRecord>> {
    let url = ArmAnalysisUrl.llm.gps().task().sample().list();
    let plain = instanceToPlain(params);
    const x = await this.http.post<
      HowellResponse<PagedList<GpsTaskSampleRecord>>,
      any
    >(url, plain);
    return HowellResponseProcess.paged(x, GpsTaskSampleRecord);
  }

  async get(id: string) {
    let url = ArmAnalysisUrl.llm.gps().task().sample().item(id);
    const x = await this.http.get<HowellResponse<GpsTaskSampleRecord>>(url);
    return HowellResponseProcess.item(x, GpsTaskSampleRecord);
  }

  async comfirmed(id: string, data: FormData) {
    let url = ArmAnalysisUrl.llm.gps().task().sample().comfirmed(id);
    const x = await this.http.post<
      HowellResponse<GpsTaskSampleRecord>,
      FormData
    >(url, data);
    return HowellResponseProcess.item(x, GpsTaskSampleRecord);
  }
}
