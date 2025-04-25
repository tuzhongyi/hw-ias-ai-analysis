import { LocaleCompare } from '../../../../../tools/compare-tool/compare.tool';
import { IService } from '../../../../cache/cache.interface';
import { ServiceCache } from '../../../../cache/service.cache';
import { AnalysisTask } from '../../../../models/arm/analysis/analysis-task.model';
import { GetAnalysisTaskListParams } from './analysis-server.params';

export class AnalysisTaskCache extends ServiceCache<AnalysisTask> {
  constructor(key: string, service: IService<AnalysisTask>) {
    super(key, service, AnalysisTask);
  }

  override filter(
    datas: AnalysisTask[],
    params: GetAnalysisTaskListParams
  ): AnalysisTask[] {
    if (params.TaskIds && params.TaskIds.length > 0) {
      datas = datas.filter((x) => {
        return params.TaskIds!.includes(x.Id);
      });
    }
    if (params.Name) {
      datas = datas.filter((x) => {
        return (x.Name ?? '')
          .toLocaleLowerCase()
          .includes((params.Name ?? '').toLocaleLowerCase());
      });
    }
    if (params.TaskStates && params.TaskStates.length > 0) {
      datas = datas.filter((x) => {
        if (x.State === undefined) return false;
        return params.TaskStates!.includes(x.State);
      });
    }
    if (params.TaskTypes && params.TaskTypes.length > 0) {
      datas = datas.filter((x) => {
        return params.TaskTypes!.includes(x.TaskType);
      });
    }
    if (params.BeginTime) {
      datas = datas.filter((x) => {
        return (x.StartTime?.getTime() ?? 0) >= params.BeginTime.getTime();
      });
    }
    if (params.EndTime) {
      datas = datas.filter((x) => {
        return (x.StartTime?.getTime() ?? 0) <= params.EndTime.getTime();
      });
    }
    if (params.Asc) {
      datas = datas.sort((a, b) => {
        let _a = a as any;
        let _b = b as any;
        return LocaleCompare.compare(_a[params.Asc!], _b[params.Asc!], true);
      });
    } else if (params.Desc) {
      datas = datas.sort((a, b) => {
        let _a = a as any;
        let _b = b as any;
        return LocaleCompare.compare(_a[params.Desc!], _b[params.Desc!], false);
      });
    }

    return datas;
  }
}
