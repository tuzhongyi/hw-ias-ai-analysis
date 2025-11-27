import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainManagerVideoSampleWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  src?: string;

  on = {
    error: (e: Event) => {
      console.error('视频加载错误', e);
    },
  };
}
