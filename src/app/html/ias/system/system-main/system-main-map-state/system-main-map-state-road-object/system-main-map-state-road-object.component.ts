import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { RoadObjectState } from '../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemMainMapStateItemComponent } from '../system-main-map-state-item/system-main-map-state-item.component';
import { SystemMainMapStateItem } from '../system-main-map-state-item/system-main-map-state-item.model';
import { SystemMainMapStateRoadObjectBusiness } from './system-main-map-state-road-object.business';

@Component({
  selector: 'ias-system-main-map-state-road-object',
  imports: [CommonModule, SystemMainMapStateItemComponent],
  templateUrl: './system-main-map-state-road-object.component.html',
  styleUrl: './system-main-map-state-road-object.component.less',
  providers: [SystemMainMapStateRoadObjectBusiness],
})
export class SystemMainMapStateRoadObjectComponent implements OnChanges {
  @Input('datas') objects: RoadObject[] = [];
  @Input() selected: RoadObjectState[] = [];
  @Output() selectedChange = new EventEmitter<RoadObjectState[]>();

  constructor(private business: SystemMainMapStateRoadObjectBusiness) {}

  datas: SystemMainMapStateItem<RoadObjectState>[] = [];

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        this.load(this.objects);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['objects']);
  }

  private async load(datas: RoadObject[]) {
    this.datas = await this.business.load(datas);
  }

  on = {
    select: (item: RoadObjectState) => {
      let index = this.selected.indexOf(item);
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(item);
      }
      this.selectedChange.emit(this.selected);
    },
  };
}
