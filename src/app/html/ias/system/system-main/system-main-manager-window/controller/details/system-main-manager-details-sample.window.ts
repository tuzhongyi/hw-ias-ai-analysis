import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { GpsTaskSampleRecord } from '../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainManagerDetailsSampleWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  data?: GpsTaskSampleRecord;
  title = '场景事件';
}
