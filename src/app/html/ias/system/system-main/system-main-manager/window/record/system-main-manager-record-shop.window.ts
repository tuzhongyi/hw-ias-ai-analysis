import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainManagerRecordShopWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.full,
  };
  title = '商铺更变';
  duration?: Duration;
}
