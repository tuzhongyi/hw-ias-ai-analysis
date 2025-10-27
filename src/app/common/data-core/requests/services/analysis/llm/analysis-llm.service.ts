import { AnalysisLLMCapability } from '../../../../models/arm/analysis/llm/analysis-llm-capability.model';
import { HowellResponse } from '../../../../models/response';
import { ArmAnalysisUrl } from '../../../../urls/arm/analysis/analysis.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { ArmAnalysisLLMGpsRequestService } from './analysis-llm-gps.service';

export class ArmAnalysisLLMRequestService {
  constructor(private http: HowellHttpClient) {}

  async capability() {
    let url = ArmAnalysisUrl.llm.capability();
    return this.http
      .get<HowellResponse<AnalysisLLMCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisLLMCapability);
      });
  }

  private _gps?: ArmAnalysisLLMGpsRequestService;
  public get gps(): ArmAnalysisLLMGpsRequestService {
    if (!this._gps) {
      this._gps = new ArmAnalysisLLMGpsRequestService(this.http);
    }
    return this._gps;
  }
}
