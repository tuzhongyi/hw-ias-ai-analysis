import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { SystemTaskResultAMapController } from './controller/system-task-result-amap.controller';

@Component({
  selector: 'ias-system-task-result-map',
  imports: [CommonModule],
  templateUrl: './system-task-result-map.component.html',
  styleUrl: './system-task-result-map.component.less',
  providers: [SystemTaskResultAMapController],
})
export class SystemTaskResultMapComponent implements OnChanges, OnDestroy {
  @Input() data?: AnalysisTask;
  @Input() selected?: ShopSign;
  @Input() signs: ShopSign[] = [];

  constructor(private controller: SystemTaskResultAMapController) {}

  loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected'] && this.selected) {
      this.controller.select(this.selected.Id);
    }
    if (changes['signs'] && this.signs) {
      this.controller.load(this.signs);
    }
  }
  ngOnDestroy(): void {
    this.controller.destroy();
  }
}
