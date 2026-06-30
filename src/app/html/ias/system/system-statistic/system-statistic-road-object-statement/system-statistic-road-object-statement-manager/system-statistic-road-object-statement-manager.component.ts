import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { DeviceStatement } from '../../../../../../common/data-core/models/arm/mobile-device/device-statement.model';
import { ScrollFullDirective } from '../../../../../../common/directives/scroll/scroll-full.directive';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { SystemStatisticRoadObjectStatement1Component } from '../system-statistic-road-object-statement-1/system-statistic-road-object-statement-1.component';
import { SystemStatisticRoadObjectStatement2Component } from '../system-statistic-road-object-statement-2/system-statistic-road-object-statement-2.component';
import { SystemStatisticRoadObjectStatement3Component } from '../system-statistic-road-object-statement-3/system-statistic-road-object-statement-3.component';
import { SystemStatisticRoadObjectStatement4Component } from '../system-statistic-road-object-statement-4/system-statistic-road-object-statement-4.component';
import { SystemStatisticRoadObjectStatement5Component } from '../system-statistic-road-object-statement-5/system-statistic-road-object-statement-5.component';
import { SystemStatisticRoadObjectStatement6Component } from '../system-statistic-road-object-statement-6/system-statistic-road-object-statement-6.component';
import { SystemStatisticRoadObjectStatement7Component } from '../system-statistic-road-object-statement-7/system-statistic-road-object-statement-7.component';
import { SystemStatisticRoadObjectStatement8Component } from '../system-statistic-road-object-statement-8/system-statistic-road-object-statement-8.component';
import { SystemStatisticRoadObjectStatement9Component } from '../system-statistic-road-object-statement-9/system-statistic-road-object-statement-9.component';
import { SystemStatisticRoadObjectStatementBusiness } from '../system-statistic-road-object-statement.business';

@Component({
  selector: 'ias-system-statistic-road-object-statement-manager',
  imports: [
    CommonModule,
    FormsModule,
    ScrollFullDirective,
    ContentHeaderComponent,
    SystemStatisticRoadObjectStatement1Component,
    SystemStatisticRoadObjectStatement2Component,
    SystemStatisticRoadObjectStatement3Component,
    SystemStatisticRoadObjectStatement4Component,
    SystemStatisticRoadObjectStatement5Component,
    SystemStatisticRoadObjectStatement6Component,
    SystemStatisticRoadObjectStatement7Component,
    SystemStatisticRoadObjectStatement8Component,
    SystemStatisticRoadObjectStatement9Component,
  ],
  templateUrl:
    './system-statistic-road-object-statement-manager.component.html',
  styleUrl: './system-statistic-road-object-statement-manager.component.less',
  providers: [SystemStatisticRoadObjectStatementBusiness],
})
export class SystemStatisticRoadObjectStatementManagerComponent implements OnInit {
  constructor(private business: SystemStatisticRoadObjectStatementBusiness) {}

  title = '道路部件月报表';

  statement: {
    object?: RoadObjectStatement;
    device?: Promise<DeviceStatement[]>;
  } = {};
  loading = false;

  directory = {
    datas: [] as string[],
    index: 0,
    to: (index: number) => {
      this.directory.index = index;
    },
  };

  load() {
    this.loading = true;
    let date = this.date.get();

    this.statement.object = undefined;
    this.statement.device = undefined;

    this.business
      .object(date)

      .then((x) => {
        this.statement.object = x;
        if (x.DeviceIds) {
          this.statement.device = this.business.device(x.DeviceIds, date);
        }
      })
      .catch((x) => {})
      .finally(() => {
        this.loading = false;
      });
  }

  @ViewChild('container') container?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.directory.datas = [
      '首页',
      '报表总结',
      '部件类型',
      '部件状态',
      '部件统计',
      '事件图表',
      `${Language.DeviceName}总览`,
      `${Language.DeviceName}统计`,
      '建议',
    ];
    this.date.init();
    this.load();
  }

  date = {
    get: () => {
      let date = new Date(this.date.year.value, this.date.month.value - 1);
      return date;
    },
    init: () => {
      let today = new Date();
      this.date.year.init();
      this.date.month.init(this.date.year.value);
      this.date.month.value = today.getMonth();
    },
    year: {
      datas: [] as number[],
      value: 0,
      change: () => {
        this.date.month.init(this.date.year.value);

        this.statement.object = undefined;
        this.statement.device = undefined;
        this.load();
      },
      init: () => {
        let first = 2026;
        let today = new Date();
        let year = today.getFullYear();
        for (let i = 0; i < year + 1 - first; i++) {
          this.date.year.datas.push(first + i);
        }
        this.date.year.value = year;
      },
    },
    month: {
      datas: [] as number[],
      value: 0,
      change: () => {
        this.statement.object = undefined;
        this.statement.device = undefined;
        this.load();
      },
      init: (year: number) => {
        let date = new Date();
        date.setFullYear(year);

        let months = DateTimeTool.full.year(date, false, false);

        this.date.month.datas = months.map((x) => x.getMonth() + 1);
      },
    },
  };

  on = {
    download: () => {
      if (this.container) {
        this.loading = true;

        this.business.export
          .save(this.container.nativeElement, this.date.get())
          .finally(() => {
            this.loading = false;
          });
      }
    },
  };
}
