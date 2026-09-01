import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import {
  Page,
  Paged,
} from '../../../../../../../common/data-core/models/interface/page-list.model';
import { SystemEventHandleParams } from '../../../../../../../common/data-core/requests/services/system/event/handle/system-event-handle.params';
import { EventBlockedParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemEventManagerRealtimeComponent } from '../system-event-manager-realtime.component';

export class SystemEventManagerRealtimeProcessWindow extends WindowViewModel {
  constructor(private that: SystemEventManagerRealtimeComponent) {
    super();
  }
  style = {
    ...SizeTool.window.plus.large({ width: 250 }),
  };
  data?: MobileEventRecord;
  page = new Page();
  title = '人工审核';

  private getstyle(handled?: boolean) {
    if (handled) {
      return SizeTool.window.large;
    }
    return SizeTool.window.plus.large({ width: 250 });
  }

  open(paged: Paged<MobileEventRecord>) {
    this.data = paged.Data;
    this.page = paged.Page;
    this.style = this.getstyle(this.data.Assignment?.Handled);

    this.show = true;
  }

  on = {
    page: {
      next: () => {
        let index = this.page.PageIndex + 1;
        if (index > this.page.PageCount) return;
        this.that.table.get.emit(index);
      },
      prev: () => {
        let index = this.page.PageIndex - 1;
        if (index < 1) return;
        this.that.table.get.emit(index);
      },
    },
  };

  blocked = {
    do: (args: {
      eventId: string;
      params: EventBlockedParams;
      autonext: boolean;
    }) => {
      this.that.business
        .blocked(args.eventId, args.params)
        .then((x) => {
          this.that.toastr.success('操作成功');
          this.that.table.args.first = false;
          this.that.table.load.emit(this.that.table.args);

          if (args.autonext) {
            this.on.page.next();
          } else {
            this.show = false;
          }
        })
        .catch((e) => {
          this.that.toastr.error('操作失败');
        });
    },
  };
  handle = {
    do: (args: {
      eventId: string;
      params: SystemEventHandleParams;
      autonext: boolean;
    }) => {
      this.that.business
        .handle(args.eventId, args.params)
        .then((x) => {
          this.that.toastr.success('操作成功');
          this.that.table.args.first = false;
          this.that.table.load.emit(this.that.table.args);

          if (args.autonext) {
            this.on.page.next();
          } else {
            this.show = false;
          }
        })
        .catch((e) => {
          this.that.toastr.error('操作失败');
        });
    },
  };
}
