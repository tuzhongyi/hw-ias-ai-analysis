import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../common/components/date-time-control/date-time-control.component';
import { WindowConfirmComponent } from '../../../../../common/components/window-confirm/window-confirm.component';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  Page,
  PagedList,
} from '../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../common/tools/language-tool/language.tool';
import { PictureListComponent } from '../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../share/window/window.component';
import { SystemModuleShopRegistrationInformationComponent } from '../../system-module/system-module-shop-registration/system-module-shop-registration-information/system-module-shop-registration-information.component';
import { SystemEventProcessSignDisconverComponent } from '../system-event-process/system-event-process-sign-disconver/system-event-process-sign-disconver.component';
import { SystemEventTableArgs } from '../system-event-table/business/system-event-table.model';
import { SystemEventTableComponent } from '../system-event-table/system-event-table.component';
import { SystemEventTaskComponent } from '../system-event-task/component/system-event-task.component';
import { SystemEventManagerHandleBusiness } from './business/system-event-manager-handle.business';
import { SystemEventManagerShopAnalysisBusiness } from './business/system-event-manager-shop-analysis.business';
import { SystemEventManagerShopRegistrationBusiness } from './business/system-event-manager-shop-registration.business';
import { SystemEventManagerShopBusiness } from './business/system-event-manager-shop.business';
import { SystemEventManagerBusiness } from './business/system-event-manager.business';

import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { SystemEventProcessInfoComponent } from '../system-event-process/system-event-process-info/system-event-process-info.component';
import { SystemEventProcessShopNameComponent } from '../system-event-process/system-event-process-shop/system-event-process-shop-name/system-event-process-shop-name.component';
import { SystemEventProcessSignDisappearComponent } from '../system-event-process/system-event-process-sign-disappear/system-event-process-sign-disappear.component';
import { SystemEventVideoComponent } from '../system-event-video/system-event-video.component';
import { SystemEventManagerProcessSignDisappearController } from './controller/process/system-event-manager-process-sign-disappear.controller';
import { SystemEventManagerProcessSignDiscoverController } from './controller/process/system-event-manager-process-sign-discover.controller';
import { SystemEventManagerProcessSignController } from './controller/process/system-event-manager-process-sign.controller';
import { SystemEventManagerProcessController } from './controller/process/system-event-manager-process.controller';
import { SystemEventManagerController } from './controller/system-event-manager.controller';
import { SystemEventManagerSource } from './system-event-manager.soiurce';
import { SystemEventManagerWindow } from './system-event-manager.window';

@Component({
  selector: 'ias-system-event-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemEventTableComponent,
    SystemEventTaskComponent,
    SystemEventVideoComponent,
    WindowComponent,
    WindowConfirmComponent,
    PictureListComponent,
    SystemEventProcessSignDisconverComponent,
    SystemModuleShopRegistrationInformationComponent,
    SystemEventProcessSignDisappearComponent,
    SystemEventProcessShopNameComponent,
    SystemEventProcessInfoComponent,
  ],
  templateUrl: './system-event-manager.component.html',
  styleUrl: './system-event-manager.component.less',
  providers: [
    SystemEventManagerSource,
    SystemEventManagerShopAnalysisBusiness,
    SystemEventManagerShopRegistrationBusiness,
    SystemEventManagerShopBusiness,
    SystemEventManagerHandleBusiness,
    SystemEventManagerBusiness,

    SystemEventManagerController,
    SystemEventManagerProcessController,
    SystemEventManagerProcessSignController,
    SystemEventManagerProcessSignDiscoverController,
    SystemEventManagerProcessSignDisappearController,
    SystemEventManagerWindow,
  ],
})
export class SystemEventManagerComponent implements OnInit {
  constructor(
    public source: SystemEventManagerSource,
    private language: LanguageTool,
    private business: SystemEventManagerBusiness,
    private toastr: ToastrService,
    public controller: SystemEventManagerController,
    public window: SystemEventManagerWindow
  ) {}

  Language = Language;

  ngOnInit(): void {
    this.regist.process.marking();
    this.regist.process.merge();
    this.regist.process.misinfo();
    this.regist.process.delete();
  }

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
        this.window.info.data = data;
        this.window.info.show = true;
      },
      picture: (data: MobileEventRecord) => {
        let paged = PagedList.create([data], 1, 1);
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
    datas: [] as Array<MobileEventRecord | ShopRegistration | ShopSign>,
    open: (
      paged: PagedList<MobileEventRecord | ShopRegistration | ShopSign>,
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
