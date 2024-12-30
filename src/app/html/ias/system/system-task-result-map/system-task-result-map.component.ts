import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { SystemTaskResultAmapController } from './controller/system-task-result-amap.controller';
import { SystemTaskResultMapBusiness } from './system-task-result-map.business';

@Component({
  selector: 'ias-system-task-result-map',
  imports: [CommonModule],
  templateUrl: './system-task-result-map.component.html',
  styleUrl: './system-task-result-map.component.less',
  providers: [SystemTaskResultAmapController, SystemTaskResultMapBusiness],
})
export class SystemTaskResultMapComponent implements OnInit, OnChanges {
  @Input() data?: AnalysisTask;
  @Input() sign?: ShopSign;

  constructor(
    private business: SystemTaskResultMapBusiness,
    private controller: SystemTaskResultAmapController
  ) {}

  loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sign'] && this.sign) {
      this.controller.select(this.sign.Id);
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.loading = true;
      this.business.load(this.data.Id).then((x) => {
        this.controller.load(x).then((x) => {
          this.loading = false;
        });
      });
    }
  }
}
