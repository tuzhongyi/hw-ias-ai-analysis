import { ShopState } from '../../../../../common/data-core/enums/analysis/shop-state.enum';
import { AnalysisTask } from '../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { IConverter } from '../../../../../common/data-core/models/converter.interface';
import { PagedList } from '../../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import {
  AnalysisTaskModel,
  SystemTaskTableFilter,
} from './system-task-table.model';

export class SystemTaskTableBusiness<T extends AnalysisTaskModel> {
  constructor(
    private service: ArmAnalysisRequestService,
    private converter: IConverter<AnalysisTask, T>
  ) {}

  async load(index: number, size: number, args: SystemTaskTableFilter) {
    let data = await this.data(index, size, args);

    if (data.Page.PageCount > 0 && data.Page.PageCount < index) {
      data = await this.data(data.Page.PageCount, size, args);
    }

    let paged = new PagedList<T>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x, i) => {
      let model = this.converter.convert(x);
      model.index = paged.Page.PageSize * (paged.Page.PageIndex - 1) + i + 1;
      return model;
    });
    let count = paged.Page.PageSize - paged.Page.RecordCount;
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        paged.Data.push(AnalysisTaskModel.create() as T);
      }
    }
    return paged;
  }

  data(index: number, size: number, args: SystemTaskTableFilter) {
    let params = new GetAnalysisTaskListParams();
    params.PageIndex = index;
    params.PageSize = size;
    if (args.finished === undefined) {
      params.TaskStates = [
        ShopState.Uploading,
        ShopState.NotStarted,
        ShopState.OnGoing,
        ShopState.Finished,
        ShopState.Failed,
      ];
    } else if (args.finished) {
      params.TaskStates = [ShopState.Finished];
    } else {
      params.TaskStates = [
        ShopState.Uploading,
        ShopState.NotStarted,
        ShopState.OnGoing,
        ShopState.Failed,
      ];
    }
    if (args.name) {
      params.Name = args.name;
    }

    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.Asc = args.asc;
    params.Desc = args.desc;

    return this.service.server.task.list(params);
  }
}
