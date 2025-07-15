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
import { Road } from '../../../../common/data-core/models/arm/geographic/road.model';
import { LocaleCompare } from '../../../../common/tools/compare-tool/compare.tool';
import { InputSelectRoadBusiness } from './input-select-road.business';

@Component({
  selector: 'ias-input-select-road',
  imports: [InputSelectComponent],
  templateUrl: './input-select-road.component.html',
  styleUrl: './input-select-road.component.less',
  providers: [InputSelectRoadBusiness],
})
export class InputSelectRoadComponent implements OnChanges {
  @Input() auto = false;
  @Input() roads: Road[] = [];
  @Output() roadsChange = new EventEmitter<Road[]>();
  @Input() selected?: Road;
  @Output() selectedChange = new EventEmitter<Road>();
  @Input() clear = false;
  @Output() clearChange = new EventEmitter<boolean>();

  constructor(private business: InputSelectRoadBusiness) {}

  name = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.change.selected(changes['selected']);
    this.change.clear(changes['clear']);
  }

  private change = {
    selected: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.selected) {
          this.name = this.selected.Name;
          this.onselect(this.selected.Id);
        } else {
          // this.name = '';
        }
      }
    },
    clear: (simple: SimpleChange) => {
      if (simple) {
        if (this.clear) {
          this.name = '';
          Promise.resolve().then(() => {
            this.clear = false;
            this.clearChange.emit(this.clear);
          });
        }
      }
    },
  };

  oninput(name: string) {
    this.name = name;
    if (this.name) {
      this.business.by.name(name).then((x) => {
        this.roads = x;
        this.roads = this.roads.sort((a, b) => {
          return LocaleCompare.compare(a.Name, b.Name);
        });
        this.roadsChange.emit(this.roads);
      });
    } else {
      this.roads = [];
      this.roadsChange.emit(this.roads);
    }
    this.selected = undefined;
    this.selectedChange.emit(this.selected);
  }
  onselect(id: string) {
    let item = this.roads.find((x) => x.Id == id);
    if (item) {
      this.roadsChange.emit([item]);
      this.selectedChange.emit(item);
    }
  }
  onfocus() {
    if (this.auto) {
      if (this.selected) {
        this.roads = [this.selected];
        this.roadsChange.emit(this.roads);
      } else if (this.name) {
        this.oninput(this.name);
      } else {
        this.business.all().then((x) => {
          this.roads = x;
          this.roads = this.roads.sort((a, b) => {
            return LocaleCompare.compare(a.Name, b.Name);
          });
          this.roadsChange.emit(this.roads);
        });
      }
    }
  }
}
