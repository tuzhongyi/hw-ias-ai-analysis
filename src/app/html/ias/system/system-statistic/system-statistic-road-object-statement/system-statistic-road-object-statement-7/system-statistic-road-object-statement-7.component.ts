import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeviceStatement } from '../../../../../../common/data-core/models/arm/mobile-device/device-statement.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemStatisticRoadObjectStatementContainerComponent } from '../system-statistic-road-object-statement-container/system-statistic-road-object-statement-container.component';
import { SystemStatisticRoadObjectStatementConverter } from '../system-statistic-road-object-statement.converter';
import { MobileDeviceStatementModel } from '../system-statistic-road-object-statement.model';

@Component({
  selector: 'ias-system-statistic-road-object-statement-7',
  imports: [
    CommonModule,
    FormsModule,
    SystemStatisticRoadObjectStatementContainerComponent,
  ],
  templateUrl: './system-statistic-road-object-statement-7.component.html',
  styleUrl: './system-statistic-road-object-statement-7.component.less',
})
export class SystemStatisticRoadObjectStatement7Component implements OnChanges {
  @Input() statement?: Promise<DeviceStatement[]>;

  Language = Language;
  Math = Math;

  data = new MobileDeviceStatementModel();
  converter = new SystemStatisticRoadObjectStatementConverter();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.statement) {
      this.statement.then((x) => this.converter.device.total(x));
    }
  }
}
