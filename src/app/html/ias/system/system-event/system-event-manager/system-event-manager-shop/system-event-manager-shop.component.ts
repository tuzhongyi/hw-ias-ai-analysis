import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { InputSelectTaskComponent } from '../../../../share/input-select-task/input-select-task.component';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemModuleShopRegistrationInformationComponent } from '../../../system-module/system-module-shop-registration/system-module-shop-registration-information/system-module-shop-registration-information.component';
import { SystemEventProcessDetailsComponent } from '../../system-event-process/system-event-process-details/system-event-process-details.component';
import { SystemEventProcessShopNameComponent } from '../../system-event-process/system-event-process-shop/system-event-process-shop-name/system-event-process-shop-name.component';
import { SystemEventProcessSignDisappearComponent } from '../../system-event-process/system-event-process-sign-disappear/system-event-process-sign-disappear.component';
import { SystemEventProcessSignDisconverComponent } from '../../system-event-process/system-event-process-sign-disconver/system-event-process-sign-disconver.component';
import { SystemEventTableArgs } from '../../system-event-table/business/system-event-table.model';
import { SystemEventTableShopComponent } from '../../system-event-table/system-event-table-shop/system-event-table-shop.component';
import { SystemEventTaskComponent } from '../../system-event-task/component/system-event-task.component';
import { SystemEventVideoComponent } from '../../system-event-video/system-event-video.component';
import { SystemEventManagerShopAnalysisBusiness } from './business/system-event-manager-shop-analysis.business';
import { SystemEventManagerShopHandleBusiness } from './business/system-event-manager-shop-handle.business';
import { SystemEventManagerShopRegistrationBusiness } from './business/system-event-manager-shop-registration.business';
import { SystemEventManagerShopTaskBusiness } from './business/system-event-manager-shop-task.business';
import { SystemEventManagerShopBusiness } from './business/system-event-manager-shop.business';
import { SystemEventManagerShopProcessSignDisappearController } from './controller/process/system-event-manager-shop-process-sign-disappear.controller';
import { SystemEventManagerShopProcessSignDiscoverController } from './controller/process/system-event-manager-shop-process-sign-discover.controller';
import { SystemEventManagerShopProcessSignController } from './controller/process/system-event-manager-shop-process-sign.controller';
import { SystemEventManagerShopProcessController } from './controller/process/system-event-manager-shop-process.controller';
import { SystemEventManagerShopController } from './controller/system-event-manager-shop.controller';
import { SystemEventManagerShopSource } from './system-event-manager-shop.soiurce';
import { SystemEventManagerShopWindow } from './system-event-manager-shop.window';

@Component({
  selector: 'ias-system-event-manager-shop',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemEventTableShopComponent,
    SystemEventTaskComponent,
    SystemEventVideoComponent,
    WindowComponent,
    WindowConfirmComponent,
    PictureListComponent,
    SystemEventProcessSignDisconverComponent,
    SystemModuleShopRegistrationInformationComponent,
    SystemEventProcessSignDisappearComponent,
    SystemEventProcessShopNameComponent,
    SystemEventProcessDetailsComponent,
    InputSelectTaskComponent,
  ],
  templateUrl: './system-event-manager-shop.component.html',
  styleUrl: './system-event-manager-shop.component.less',
  providers: [
    SystemEventManagerShopSource,
    SystemEventManagerShopAnalysisBusiness,
    SystemEventManagerShopRegistrationBusiness,
    SystemEventManagerShopHandleBusiness,
    SystemEventManagerShopTaskBusiness,
    SystemEventManagerShopBusiness,

    SystemEventManagerShopController,
    SystemEventManagerShopProcessController,
    SystemEventManagerShopProcessSignController,
    SystemEventManagerShopProcessSignDiscoverController,
    SystemEventManagerShopProcessSignDisappearController,
    SystemEventManagerShopWindow,
  ],
})
export class SystemEventManagerShopComponent implements OnInit {
  constructor(
    public source: SystemEventManagerShopSource,
    private language: LanguageTool,
    private business: SystemEventManagerShopBusiness,
    private toastr: ToastrService,
    public controller: SystemEventManagerShopController,
    public window: SystemEventManagerShopWindow
  ) {}

  Language = Language;

  ngOnInit(): void {
    // this.init.task();
    this.init.table();
    this.regist.process.marking();
    this.regist.process.merge();
    this.regist.process.misinfo();
    this.regist.process.delete();
  }

  private init = {
    task: () => {
      this.business.task.load(this.table.args.duration).then((x) => {
        this.source.task = x;
      });
    },
    table: () => {
      this.table.args.types = this.source.type.map((x) => x.Value);
    },
  };

  private regist = {
    process: {
      marking: () => {
        this.controller.process.sign.discover.event.marking.subscribe((id) => {
          this.business.handle.shop
            .marking(id)
            .then((x) => {
              this.toastr.success('屏蔽成功');
              this.table.args.first = false;
              this.table.load.emit(this.table.args);
            })
            .catch((e) => {
              this.toastr.error('操作失败');
            })
            .finally(() => {
              this.controller.process.sign.discover.close();
            });
        });
      },
      merge: () => {
        this.controller.process.sign.discover.event.merge.subscribe((data) => {
          this.business.handle.shop
            .merge(data.eventId, data.shopId, data.subname, data.name)
            .then((x) => {
              this.toastr.success('关联成功');
              this.table.args.first = false;
              this.table.load.emit(this.table.args);
            })
            .catch((e) => {
              this.toastr.error('操作失败');
            })
            .finally(() => {
              this.controller.process.sign.discover.close();
            });
        });
      },
      misinfo: () => {
        this.controller.process.sign.disappear.event.misinfo.subscribe((id) => {
          this.business.handle
            .misinform(id)
            .then((x) => {
              this.toastr.success('标记误报成功');
              this.table.args.first = false;
              this.table.load.emit(this.table.args);
            })
            .catch((e) => {
              this.toastr.error('操作失败');
            })
            .finally(() => {
              this.controller.process.sign.disappear.close();
            });
        });
      },
      delete: () => {
        this.controller.process.sign.disappear.event.delete.subscribe((id) => {
          this.business.handle.shop
            .delete(id)
            .then((x) => {
              this.toastr.success('删除成功');
              this.table.args.first = false;
              this.table.load.emit(this.table.args);
            })
            .catch((e) => {
              this.toastr.error('操作失败');
            })
            .finally(() => {
              this.controller.process.sign.disappear.close();
            });
        });
      },
    },
  };

  table = {
    args: new SystemEventTableArgs(),
    load: new EventEmitter<SystemEventTableArgs>(),
    task: {
      change: (data: AnalysisTask) => {
        this.table.args.taskId = data?.Id;
      },
    },
    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
    on: {
      video: async (data: MobileEventRecord) => {
        let name = await this.language.event.EventType(data.EventType);
        this.window.video.title = `${name}`;
        if (data.Resources && data.Resources.length > 0) {
          let resource = data.Resources[0];
          this.window.video.title = `${resource.ResourceName} ${name}`;
        }
        this.window.video.data = data;
        this.window.video.show = true;
      },
      details: (data: MobileEventRecord) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
      picture: (data: MobileEventRecord) => {
        let datas = data.Resources?.filter((x) => x.ImageUrl) ?? [];
        let page = new Page();
        page.PageCount = datas.length;
        page.TotalRecordCount = datas.length;
        page.PageIndex = 1;
        page.PageSize = 1;
        page.RecordCount = 1;

        let paged = new PagedList<EventResourceContent>();
        paged.Page = page;
        paged.Data = datas;
        this.picture.open(paged, this.window.picture.show);
      },
      process: (data: MobileEventRecord) => {
        this.controller.process.open(data);
      },
      task: (data: MobileEventRecord) => {
        this.window.task.data = data;
        this.window.task.show = true;
      },
    },
  };

  picture = {
    datas: [] as Array<
      MobileEventRecord | EventResourceContent | ShopRegistration | ShopSign
    >,
    open: (
      paged: PagedList<
        MobileEventRecord | EventResourceContent | ShopRegistration | ShopSign
      >,
      opened: boolean = false
    ) => {
      if (paged.Data.length == 0) return;

      this.picture.datas = paged.Data;

      this.window.picture.page = paged.Page;
      let index = paged.Page.PageIndex - 1;
      let data = paged.Data[index];
      this.window.picture.set(data);
      if (!opened) {
        this.window.picture.show = true;
      }
    },
    change: (page: Page) => {
      this.window.picture.page = page;
      let index = page.PageIndex - 1;
      let data = this.picture.datas[index];
      this.window.picture.set(data);
    },
  };

  confirm = {
    ok: () => {
      this.window.confirm.result = true;
      this.window.confirm.show = false;
    },
    close: () => {
      this.window.confirm.result = false;
      this.window.confirm.show = false;
    },
  };
}
