import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { SystemTaskShopRegistrationDetailsComponent } from '../system-task-shop-registration-details/system-task-shop-registration-details.component';
import { SystemTaskShopRegistrationTableComponent } from '../system-task-shop-registration-table/system-task-shop-registration-table.component';
import { SystemTaskShopRegistrationTableArgs } from '../system-task-shop-registration-table/system-task-shop-registration-table.model';
import { SystemTaskShopRegistrationManagerBusiness } from './system-task-shop-registration-manager.business';

@Component({
  selector: 'ias-system-task-shop-registration-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemTaskShopRegistrationTableComponent,
    SystemTaskShopRegistrationDetailsComponent,
  ],
  templateUrl: './system-task-shop-registration-manager.component.html',
  styleUrl: './system-task-shop-registration-manager.component.less',
  providers: [SystemTaskShopRegistrationManagerBusiness],
})
export class SystemTaskShopRegistrationManagerComponent
  implements OnChanges, OnInit
{
  @Input() detected?: boolean;
  @Input() task?: AnalysisTask;
  @Output() video = new EventEmitter<IShop>();
  constructor(private business: SystemTaskShopRegistrationManagerBusiness) {}

  Language = Language;
  inited = false;
  table = {
    args: new SystemTaskShopRegistrationTableArgs(),
    load: new EventEmitter<SystemTaskShopRegistrationTableArgs>(),
    selected: undefined as ShopRegistration | undefined,
  };
  source = {
    road: [] as Road[],
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.task(changes['task']);
  }
  private change = {
    task: (change: SimpleChange) => {
      if (change) {
        if (this.task) {
          this.table.args.taskId = this.task.Id;
        }
      }
    },
  };

  ngOnInit(): void {
    this.table.args.detected = this.detected;
    this.init();
    this.inited = true;
  }

  init() {
    this.business.load().then((x) => {
      this.source.road = x;
    });
  }

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },
    video: (item: ShopRegistration) => {
      this.video.emit(item);
    },
  };
}
