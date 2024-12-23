import { instanceToPlain } from 'class-transformer';
import { AnalysisServerCapability } from '../../../../models/arm/analysis/analysis-server-capability.model';
import { AnalysisServer } from '../../../../models/arm/analysis/analysis-server.model';
import { AnalysisTaskResult } from '../../../../models/arm/analysis/analysis-task-result.model';
import { AnalysisTask } from '../../../../models/arm/analysis/analysis-task.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmAnalysisUrl } from '../../../../urls/arm/analysis/analysis.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import {
  AnalysisTaskSource,
  GetAnalysisTaskListParams,
  GetAnalysisTaskResultListParams,
} from './analysis-server.params';

export class ArmAnalysisServerRequestService {
  constructor(private http: HowellHttpClient) {}

  async array() {
    let url = ArmAnalysisUrl.server.basic();
    return this.http.get<HowellResponse<AnalysisServer[]>>(url).then((x) => {
      return HowellResponseProcess.array(x, AnalysisServer);
    });
  }
  async create(data: AnalysisServer) {
    let url = ArmAnalysisUrl.server.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<any, HowellResponse<AnalysisServer>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisServer);
      });
  }

  async get(id: string) {
    let url = ArmAnalysisUrl.server.item(id);
    return this.http.get<HowellResponse<AnalysisServer>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisServer);
    });
  }
  async delete(id: string) {
    let url = ArmAnalysisUrl.server.item(id);
    return this.http.delete<HowellResponse<AnalysisServer>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisServer);
    });
  }
  async update(data: AnalysisServer) {
    let url = ArmAnalysisUrl.server.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<AnalysisServer>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisServer);
      });
  }

  async capability() {
    let url = ArmAnalysisUrl.server.capability();
    return this.http
      .get<HowellResponse<AnalysisServerCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisServerCapability);
      });
  }

  private _task?: ArmAnalysisServerTaskRequestService;
  public get task(): ArmAnalysisServerTaskRequestService {
    if (!this._task) {
      this._task = new ArmAnalysisServerTaskRequestService(this.http);
    }
    return this._task;
  }
}
class ArmAnalysisServerTaskRequestService {
  constructor(private http: HowellHttpClient) {}

  async create(data: AnalysisTask) {
    let url = ArmAnalysisUrl.server.task.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<any, HowellResponse<AnalysisTask>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisTask);
      });
  }

  async get(id: string) {
    let url = ArmAnalysisUrl.server.task.item(id);
    return this.http.get<HowellResponse<AnalysisTask>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisTask);
    });
  }
  async delete(id: string) {
    let url = ArmAnalysisUrl.server.task.item(id);
    return this.http.delete<HowellResponse<AnalysisTask>>(url).then((x) => {
      return HowellResponseProcess.item(x, AnalysisTask);
    });
  }
  async list(params: GetAnalysisTaskListParams) {
    let url = ArmAnalysisUrl.server.task.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<any, HowellResponse<PagedList<AnalysisTask>>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, AnalysisTask);
      });
  }

  async source(id: string, params: AnalysisTaskSource) {
    let url = ArmAnalysisUrl.server.task.source(id);
    let plain = instanceToPlain(params);
    return this.http
      .post<any, HowellResponse<AnalysisTask>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, AnalysisTask);
      });
  }

  private _result?: { params: ArmAnalysisServerTaskResultRequestService };
  public get result(): { params: ArmAnalysisServerTaskResultRequestService } {
    if (!this._result) {
      this._result = {
        params: new ArmAnalysisServerTaskResultRequestService(this.http),
      };
    }
    return this._result;
  }
}

class ArmAnalysisServerTaskResultRequestService {
  constructor(private http: HowellHttpClient) {}

  async list(params: GetAnalysisTaskResultListParams) {
    let url = ArmAnalysisUrl.server.task.result.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<any, HowellResponse<PagedList<AnalysisTaskResult>>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, AnalysisTaskResult);
      });
  }
}
