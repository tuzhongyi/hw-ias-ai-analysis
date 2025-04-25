import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputSelectComponent } from '../../../../common/components/input-select/input-select.component';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';
import { InputSelectRoadBusiness } from './input-select-road.business';

@Component({
  selector: 'ias-input-select-road',
  imports: [InputSelectComponent],
  templateUrl: './input-select-road.component.html',
  styleUrl: './input-select-road.component.less',
  providers: [InputSelectRoadBusiness],
})
export class InputSelectRoadComponent {
  @Input() roads: Road[] = [];
  @Output() roadsChange = new EventEmitter<Road[]>();

  constructor(private business: InputSelectRoadBusiness) {}

  name = '';

  oninput(name: string) {
    this.name = name;
    if (this.name) {
      this.business.by.name(name).then((x) => {
        this.roads = x;
        this.roadsChange.emit(this.roads);
      });
    } else {
      this.roads = [];
      this.roadsChange.emit(this.roads);
    }
  }
  onselect(id: string) {
    let items = this.roads.filter((x) => x.Id == id);
    this.roadsChange.emit(items);
  }
}
