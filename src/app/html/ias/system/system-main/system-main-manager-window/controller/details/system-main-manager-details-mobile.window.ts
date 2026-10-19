import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { Page } from '../../../../../../../common/data-core/models/interface/page-list.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainManagerDetailsMobileWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.plus.large({ width: 250 }),
  };
  data?: MobileEventRecord;
  title = 'AI分析处理';
  /** 有它才出上一条/下一条 */
  page?: Page;

  /** 正在翻的那一份列表，由打开它的地方给 */
  private datas: MobileEventRecord[] = [];

  /**
   * @param datas 点开这条时它所在的那份列表 —— 翻页只在这里面走。
   *              列表里找不到它（比如已经被筛掉了）时照常打开，只是不给翻页。
   */
  open(data: MobileEventRecord, datas: MobileEventRecord[] = []) {
    this.datas = datas;
    let index = datas.indexOf(data);
    if (index >= 0) {
      this.set(index);
    } else {
      this.data = data;
      this.page = undefined;
    }
    this.show = true;
  }

  on = {
    page: {
      prev: () => {
        this.set(this.index - 1);
      },
      next: () => {
        this.set(this.index + 1);
      },
    },
  };

  private get index(): number {
    let index = (this.page?.PageIndex ?? 1) - 1;
    return index < 0 ? 0 : index;
  }

  private set(index: number) {
    if (index < 0 || index >= this.datas.length) return;
    this.data = this.datas[index];
    // 一次只看一条，页数就是条数
    this.page = Page.create(index + 1, 1, this.datas.length);
  }
}
