import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';

export class SystemEventManagerRealtimeDownloadWindow extends WindowViewModel {
  clear() {
    this.message = '';
    this.result = undefined;
  }
  message: string = '导出文件是否包含图片？';
  result?: boolean;
}
