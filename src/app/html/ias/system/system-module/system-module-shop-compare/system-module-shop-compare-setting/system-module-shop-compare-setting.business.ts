import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';

@Injectable()
export class SystemModuleShopCompareSettingBusiness {
  constructor(private analysis: ArmAnalysisRequestService) {}

  private _count = 0;
  get count() {
    return new Promise<number>((resolve) => {
      if (this._count) {
        resolve(this._count);
        return;
      }
      let params = new GetAnalysisTaskListParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      params.TaskStates = [2];
      params.TaskTypes = [101];
      return this.analysis.server.task.list(params).then((x) => {
        this._count = x.Page.TotalRecordCount;
        resolve(this._count);
      });
    });
  }
}
