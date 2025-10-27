import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../tools/service-tool/service.tool';
import { AbstractService } from '../../../../cache/cache.interface';
import { AnalysisGpsTask } from '../../../../models/arm/analysis/llm/analysis-gps-task.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmAnalysisUrl } from '../../../../urls/arm/analysis/analysis.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { ArmAnalysisLLMGpsTaskSampleRequestService } from './analysis-llm-gps-task-sample.service';
import { GetAnalysisGpsTaskListParams } from './analysis-llm.params';

export class ArmAnalysisLLMGpsTaskRequestService extends AbstractService<AnalysisGpsTask> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  create(data: AnalysisGpsTask): Promise<AnalysisGpsTask> {
    let url = ArmAnalysisUrl.llm.gps().task().basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<HowellResponse<AnalysisGpsTask>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisGpsTask);
      });
  }

  override async list(
    params: GetAnalysisGpsTaskListParams
  ): Promise<PagedList<AnalysisGpsTask>> {
    let url = ArmAnalysisUrl.llm.gps().task().list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<AnalysisGpsTask>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, AnalysisGpsTask);
      });
  }
  override all(
    params: GetAnalysisGpsTaskListParams
  ): Promise<AnalysisGpsTask[]> {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }
  override get(id: string): Promise<AnalysisGpsTask> {
    let url = ArmAnalysisUrl.llm.gps().task().item(id);
    return this.http
      .get<HowellResponse<AnalysisGpsTask>>(url)
      .then((x) => HowellResponseProcess.item(x, AnalysisGpsTask));
  }
  async delete(id: string): Promise<AnalysisGpsTask> {
    let url = ArmAnalysisUrl.llm.gps().task().item(id);
    return this.http.delete<HowellResponse<AnalysisGpsTask>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisGpsTask);
    });
  }

  private _sample?: ArmAnalysisLLMGpsTaskSampleRequestService;
  public get sample(): ArmAnalysisLLMGpsTaskSampleRequestService {
    if (!this._sample) {
      this._sample = new ArmAnalysisLLMGpsTaskSampleRequestService(this.http);
    }
    return this._sample;
  }
}
