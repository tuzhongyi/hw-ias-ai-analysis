import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';
import { NameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  Paged,
} from '../../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainManagerPictureWindow extends WindowViewModel {
  clear() {
    this.id = undefined;
    this.polygon = [];
    this.title = '';
  }
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  id?: string;
  polygon: HowellPoint[] = [];
  page?: Page;

  private datas: NameValue[] = [];

  change(page: Page) {
    this.page = page;
    let item = this.datas[page.PageIndex - 1];
    this.id = item.Value;
    this.title = item.Name;
  }

  open<T>(paged: Paged<T>) {
    if (paged.Data instanceof MobileEventRecord) {
    }
    {
      this.from.record(paged.Data as MobileEventRecord);
    }
    this.page = Page.create(
      paged.Page.PageIndex,
      1,
      paged.Page.TotalRecordCount
    );
    this.change(this.page);
    this.show = true;
  }

  private from = {
    record: (data: MobileEventRecord) => {
      if (data.Resources && data.Resources.length > 0) {
        this.datas = data.Resources.map((r) => {
          let item = new NameValue();
          item.Name = r.ResourceName;
          item.Value = r.ImageUrl ?? '';
          return item;
        }).filter((x) => !!x.Value);
      }
    },
  };
}
