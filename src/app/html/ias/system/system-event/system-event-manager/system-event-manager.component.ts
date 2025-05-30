import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../common/components/date-time-control/date-time-control.component';
import { WindowConfirmComponent } from '../../../../../common/components/window-confirm/window-confirm.component';
import { BusinessState } from '../../../../../common/data-core/enums/event/arm-business-state.enum';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import {
  Page,
  Paged,
} from '../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../common/tools/language-tool/language.tool';
import { PictureListPageComponent } from '../../../share/picture/picture-list-page/picture-list-page.component';
import { VideoComponent } from '../../../share/video/video.component';
import { WindowComponent } from '../../../share/window/window.component';
import { SystemEventDetailsComponent } from '../system-event-details/component/system-event-details.component';
import { SystemEventHandleComponent } from '../system-event-handle/component/system-event-handle.component';
import { ISystemEventHandleResult } from '../system-event-handle/component/system-event-handle.model';
import { SystemEventHandleCreationComponent } from '../system-event-handle/system-event-handle-creation/system-event-handle-creation.component';
import { SystemEventHandleMergeComponent } from '../system-event-handle/system-event-handle-merge/system-event-handle-merge.component';
import { SystemEventHandleRelateComponent } from '../system-event-handle/system-event-handle-relate/system-event-handle-relate.component';
import { SystemEventMapComponent } from '../system-event-map/system-event-map.component';
import { SystemEventTableArgs } from '../system-event-table/business/system-event-table.model';
import { SystemEventTableComponent } from '../system-event-table/system-event-table.component';
import { SystemEventManagerHandleBusiness } from './business/system-event-manager-handle.business';
import { SystemEventManagerShopAnalysisBusiness } from './business/system-event-manager-shop-analysis.business';
import { SystemEventManagerShopRegistrationBusiness } from './business/system-event-manager-shop-registration.business';
import { SystemEventManagerShopBusiness } from './business/system-event-manager-shop.business';
import { SystemEventManagerBusiness } from './business/system-event-manager.business';
import { SystemEventManagerSource } from './system-event-manager.soiurce';
import { SystemEventManagerWindow } from './system-event-manager.window';

@Component({
  selector: 'ias-system-event-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SystemEventTableComponent,
    SystemEventDetailsComponent,
    SystemEventMapComponent,
    SystemEventHandleComponent,
    VideoComponent,
    WindowComponent,
    WindowConfirmComponent,
    PictureListPageComponent,
    SystemEventHandleCreationComponent,
    SystemEventHandleRelateComponent,
    SystemEventHandleMergeComponent,
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
  ],
})
export class SystemEventManagerComponent {
  constructor(
    public source: SystemEventManagerSource,
    private language: LanguageTool,
    private business: SystemEventManagerBusiness,
    private toastr: ToastrService
  ) {}
  window = new SystemEventManagerWindow();

  Language = Language;

  table = {
    args: new SystemEventTableArgs(),
    load: new EventEmitter<SystemEventTableArgs>(),
    get: new EventEmitter<number>(),
    search: () => {
      this.table.load.emit(this.table.args);
    },
    on: {
      page: (index: number) => {
        this.table.get.emit(index);
      },
      got: (data: Paged<Paged<MobileEventRecord>>) => {
        if (this.window.picture.show) {
          this.picture.open(data, this.window.picture.show);
        }
        if (this.window.handle.show) {
          let paged = new Paged<MobileEventRecord>();
          paged.Page = data.Page;
          paged.Data = data.Data.Data;
          this.table.on.handle(paged);
        }
      },
      position: async (data: MobileEventRecord) => {
        this.window.map.title = `${await this.language.event.EventType(
          data.EventType
        )} ${formatDate(data.EventTime, Language.YearMonthDayHHmmss, 'en')}`;
        this.window.map.data = data.Location;
        this.window.map.show = true;
      },
      video: (data: MobileEventRecord) => {
        if (data.Resources && data.Resources.length > 0) {
          this.window.video.filename = data.Resources[0].RecordUrl;
          this.window.video.show = true;
        }
      },
      details: (data: MobileEventRecord) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
      picture: (data: Paged<Paged<MobileEventRecord>>) => {
        this.picture.open(data, this.window.picture.show);
      },
      handle: (paged: Paged<MobileEventRecord>) => {
        this.window.handle.data = paged.Data;
        this.window.handle.page = paged.Page;
        this.window.handle.show = true;
      },
      merge: (data: MobileEventRecord) => {
        this.handle.result = 'registrationmerge';
        this.window.merge.clear();
        this.window.merge.data = data;
        if (data.Resources && data.Resources.length > 0) {
          let resource = data.Resources[0];
          this.handle.data = data;
          this.window.merge.name = resource.ResourceName;
          this.window.merge.show = true;
        }
      },
    },
  };

  picture = {
    open: async (paged: Paged<Paged<MobileEventRecord>>, opened = false) => {
      this.window.picture.page = paged.Page;
      if (!opened) {
        this.window.picture.index = paged.Data.Page.PageIndex;
      }

      this.window.picture.datas =
        paged.Data.Data.Resources?.map((x) => x.ImageUrl ?? '') ?? [];

      if (this.window.picture.index > this.window.picture.datas.length) {
        this.window.picture.index = this.window.picture.datas.length;
      }

      this.window.picture.title = `${await this.language.event.EventType(
        paged.Data.Data.EventType
      )} ${formatDate(
        paged.Data.Data.EventTime,
        Language.YearMonthDayHHmmss,
        'en'
      )}`;
      this.window.picture.show = true;
    },
    change: (page: Page) => {
      this.table.get.emit(page.PageIndex);
    },
  };

  handle = {
    result: '',
    data: undefined as MobileEventRecord | undefined,
    on: {
      misinform: async (result: ISystemEventHandleResult) => {
        this.handle.result = result.model;
        this.handle.data = result.data;
        let name = await this.language.event.EventType(
          this.handle.data.EventType
        );
        this.window.confirm.message = `是否把${name}事件设置为误报？`;
        this.window.confirm.show = true;
      },
      registration: {
        create: async (result: ISystemEventHandleResult) => {
          this.handle.result = result.model;
          this.handle.data = result.data;
          if (
            this.handle.data.Resources &&
            this.handle.data.Resources.length > 0
          ) {
            let resource = this.handle.data.Resources[0];
            this.window.creation.name = resource.ResourceName;
            this.window.creation.sub = false;
            this.window.creation.show = true;
          } else {
            this.toastr.warning('事件没有数据源');
          }
        },
        delete: (result: ISystemEventHandleResult) => {
          this.handle.result = result.model;
          this.handle.data = result.data;
          if (
            this.handle.data.Resources &&
            this.handle.data.Resources.length > 0
          ) {
            let name = this.handle.data.Resources[0].ResourceName;
            this.window.confirm.message = `是否删除 ${name}？`;
            this.window.confirm.show = true;
          } else {
            this.toastr.warning('事件没有数据源');
          }
        },
        merge: (result: ISystemEventHandleResult) => {
          this.handle.result = result.model;
          this.handle.data = result.data;
          if (
            this.handle.data.Resources &&
            this.handle.data.Resources.length > 0
          ) {
            this.window.merge.clear();
            let resource = this.handle.data.Resources[0];
            this.window.merge.data = this.handle.data;
            this.window.merge.name = resource.ResourceName;
            this.window.merge.show = true;
          }
        },
      },
      shop: {
        suspension: (result: ISystemEventHandleResult) => {
          this.handle.result = result.model;
          this.handle.data = result.data;
          if (
            this.handle.data.Resources &&
            this.handle.data.Resources.length > 0
          ) {
            let name = this.handle.data.Resources[0].ResourceName;
            this.window.confirm.message = `是否把 ${name} 设置为停业？`;
            this.window.confirm.show = true;
          } else {
            this.toastr.warning('事件没有数据源');
          }
        },
        operation: (result: ISystemEventHandleResult) => {
          this.handle.result = result.model;
          this.handle.data = result.data;
          if (
            this.handle.data.Resources &&
            this.handle.data.Resources.length > 0
          ) {
            let name = this.handle.data.Resources[0].ResourceName;
            this.window.confirm.message = `是否把 ${name} 设置为营业？`;
            this.window.confirm.show = true;
          } else {
            this.toastr.warning('事件没有数据源');
          }
        },
        decoration: (result: ISystemEventHandleResult) => {
          this.handle.result = result.model;
          this.handle.data = result.data;
          if (
            this.handle.data.Resources &&
            this.handle.data.Resources.length > 0
          ) {
            let name = this.handle.data.Resources[0].ResourceName;
            this.window.confirm.message = `是否把 ${name} 设置为装修？`;
            this.window.confirm.show = true;
          } else {
            this.toastr.warning('事件没有数据源');
          }
        },
        marking: (result: ISystemEventHandleResult) => {
          this.handle.result = result.model;
          this.handle.data = result.data;
          if (
            this.handle.data.Resources &&
            this.handle.data.Resources.length > 0
          ) {
            let name = this.handle.data.Resources[0].ResourceName;
            this.window.confirm.message = `是否屏蔽 ${name}？`;
            this.window.confirm.show = true;
          } else {
            this.toastr.warning('事件没有数据源');
          }
        },
      },
    },
    merge: {
      relate: {
        open: (data: MobileEventRecord) => {
          this.business.shop.analysis.get(data.Id).then((x) => {
            this.window.relate.data = x;
            if (data.Resources && data.Resources.length > 0) {
              let resource = data.Resources[0];
              this.window.relate.data.Name = resource.ResourceName;
            }

            this.window.relate.show = true;
          });
        },
        ok: (data: ShopRegistration) => {
          this.window.merge.registration = data;
          this.window.relate.show = false;
        },
      },
    },
  };

  check = {
    merge: () => {
      if (!this.window.merge.registration) {
        this.toastr.error('请选择关联的注册商户');
        return false;
      }
      return true;
    },
  };

  confirm = {
    ok: () => {
      if (this.handle.data) {
        let promise: Promise<MobileEventRecord> | undefined = undefined;
        switch (this.handle.result) {
          case 'misinform':
            promise = this.business.handle.misinform(this.handle.data.Id);
            break;
          case 'registrationdelete':
            promise = this.business.handle.shop.delete(this.handle.data.Id);
            break;
          case 'registrationcreate':
            if (
              this.handle.data.Resources &&
              this.handle.data.Resources.length > 0
            ) {
              let resource = this.handle.data.Resources[0];
              promise = this.business.shop.analysis
                .get(resource.ResourceId)
                .then((shop) => {
                  return this.business.shop.registration
                    .create(shop)
                    .then((registration) => {
                      return this.business.handle.shop.create(
                        this.handle.data!.Id,
                        registration.Id,
                        this.window.creation.sub
                      );
                    });
                });
            }

            break;
          case 'registrationmerge':
            if (!this.check.merge()) return;
            if (this.window.merge.registration) {
              promise = this.business.handle.shop.merge(
                this.handle.data.Id,
                this.window.merge.registration.Id,
                this.window.merge.sub,
                this.window.merge.name
              );
            }
            break;
          case 'shopsuspension':
            promise = this.business.handle.state.change(
              this.handle.data.Id,
              BusinessState.Suspension
            );
            break;
          case 'shopoperation':
            promise = this.business.handle.state.change(
              this.handle.data.Id,
              BusinessState.Operation
            );
            break;
          case 'shopdecoration':
            promise = this.business.handle.state.change(
              this.handle.data.Id,
              BusinessState.Decoration
            );
            break;
          case 'shopmarking':
            promise = this.business.handle.shop.marking(this.handle.data.Id);
            break;

          default:
            break;
        }
        if (promise) {
          promise
            .then((x) => {
              this.toastr.success('操作成功');
              this.window.handle.show = false;
              this.confirm.close();
              this.table.load.emit(this.table.args);
            })
            .catch((x) => {
              this.toastr.error('操作失败');
              this.window.confirm.show = false;
            });
        }
      }
    },
    close: () => {
      this.window.merge.show = false;
      this.window.creation.show = false;
      this.window.confirm.show = false;
    },
  };
}
