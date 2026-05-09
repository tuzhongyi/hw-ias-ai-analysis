import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeviceStatement } from '../../../../../../common/data-core/models/arm/mobile-device/device-statement.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemStatisticRoadObjectStatement8ChartComponent } from '../system-statistic-road-object-statement-8-chart/system-statistic-road-object-statement-8-chart.component';
import { SystemStatisticRoadObjectStatementContainerComponent } from '../system-statistic-road-object-statement-container/system-statistic-road-object-statement-container.component';
import { SystemStatisticRoadObjectStatementConverter } from '../system-statistic-road-object-statement.converter';
import { MobileDeviceStatementModel } from '../system-statistic-road-object-statement.model';

@Component({
  selector: 'ias-system-statistic-road-object-statement-8',
  imports: [
    CommonModule,
    FormsModule,
    SystemStatisticRoadObjectStatementContainerComponent,
    SystemStatisticRoadObjectStatement8ChartComponent,
  ],
  templateUrl: './system-statistic-road-object-statement-8.component.html',
  styleUrl: './system-statistic-road-object-statement-8.component.less',
})
export class SystemStatisticRoadObjectStatement8Component {
  @Input() statement?: Promise<DeviceStatement[]>;

  total = new MobileDeviceStatementModel();
  items: MobileDeviceStatementModel[] = [];
  converter = new SystemStatisticRoadObjectStatementConverter();

  Language = Language;

  ngOnChanges(): void {
    if (this.statement) {
      this.statement.then((x) => {
        this.total = this.converter.device.total(x);
        this.items = x.map((y) => this.converter.device.single(y));
      });
    }
  }
}
