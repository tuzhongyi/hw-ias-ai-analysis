import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemModuleRoadTableBusiness } from './system-module-road-table.business';
import { SystemModuleRoadTableArgs } from './system-module-road-table.model';

@Component({
  selector: 'ias-system-module-road-table',
  imports: [CommonModule],
  templateUrl: './system-module-road-table.component.html',
  styleUrl: './system-module-road-table.component.less',
  providers: [SystemModuleRoadTableBusiness],
})
export class SystemModuleRoadTableComponent implements OnInit, OnDestroy {
  @Input() args = new SystemModuleRoadTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadTableArgs>;
  @Output() modify = new EventEmitter<Road>();
  @Output() delete = new EventEmitter<Road>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<Road[]>();
  @Input() selected?: Road;
  @Output() selectedChange = new EventEmitter<Road>();

  constructor(private business: SystemModuleRoadTableBusiness) {}

  datas: Road[] = [];

  widths = ['65px', 'auto', 'auto', '100px'];
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(this.args);
      });
      this.subscription.add(sub);
    }
    this.load(this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: SystemModuleRoadTableArgs) {
    this.business
      .load(args)
      .then((x) => {
        this.datas = x;
        this.loaded.emit(x);
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  onselect(item: Road) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
    this.selectedChange.emit(this.selected);
  }

  onmodify(item: Road, e: Event) {
    this.modify.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  ondelete(item: Road, e: Event) {
    this.delete.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
