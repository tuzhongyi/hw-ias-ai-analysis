import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';

export class SystemEventManagerRealtimeConfirmWindow extends WindowViewModel {
  clear() {
    this.message = '';
    this.result = undefined;
  }
  message: string = '';
  result?: boolean;
}
