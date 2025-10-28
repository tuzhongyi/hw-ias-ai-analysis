import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { HtmlTool } from '../../../../../../common/tools/html-tool/html.tool';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemEventGpsTaskManagerWindow {
  video = new VideoWindow();
  details = new DetailsWindow();
}

class VideoWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  src?: string;
}
class DetailsWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60 + 12 + 36 + 10
    ),
    height: '85%',
  };
  title = '';
  data?: GpsTaskSampleRecord;
}
