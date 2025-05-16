import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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
export class InputSelectRoadComponent implements OnChanges {
  @Input() roads: Road[] = [];
  @Output() roadsChange = new EventEmitter<Road[]>();
  @Input() selected?: Road;
  @Input() selectedChange = new EventEmitter<Road>();

  constructor(private business: InputSelectRoadBusiness) {}

  name = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.change.selected(changes['selected']);
  }

  private change = {
    selected: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.selected) {
          this.name = this.selected.Name;
          this.onselect(this.selected.Id);
        } else {
          this.name = '';
        }
      }
    },
  };

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
    let item = this.roads.find((x) => x.Id == id);
    if (item) {
      this.roadsChange.emit([item]);
      this.selectedChange.emit(item);
    }
  }
}
