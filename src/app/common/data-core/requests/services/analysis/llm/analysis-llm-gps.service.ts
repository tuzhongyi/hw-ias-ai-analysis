import { HowellHttpClient } from '../../../howell-http.client';
import { ArmAnalysisLLMGpsTaskRequestService } from './analysis-llm-gps-task.service';

export class ArmAnalysisLLMGpsRequestService {
  constructor(private http: HowellHttpClient) {}

  private _task?: ArmAnalysisLLMGpsTaskRequestService;
  public get task(): ArmAnalysisLLMGpsTaskRequestService {
    if (!this._task) {
      this._task = new ArmAnalysisLLMGpsTaskRequestService(this.http);
    }
    return this._task;
  }
}
