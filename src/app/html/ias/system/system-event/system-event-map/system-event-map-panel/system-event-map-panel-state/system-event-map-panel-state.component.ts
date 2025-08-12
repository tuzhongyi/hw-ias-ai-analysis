import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';

@Component({
  selector: 'ias-system-event-map-panel-state',
  imports: [],
  templateUrl: './system-event-map-panel-state.component.html',
  styleUrl: './system-event-map-panel-state.component.less',
})
export class SystemEventMapPanelStateComponent implements OnChanges {
  @Input() datas: MobileEventRecord[] = [];
  @Input() selecteds: number[] = [1, 2, 3];
  @Output() selectedsChange = new EventEmitter<number[]>();

  constructor() {
    this.init();
  }

  data = {
    handled: 0,
    unhandle: 0,
    misinform: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
  }
  change = {
    datas: (change: SimpleChange) => {
      if (change) {
        this.init();
        this.datas.forEach((x) => {
          if (x.Assignment?.Handled) {
            if (x.Assignment?.IsMisInfo) {
              this.data.misinform++;
            } else {
              this.data.handled++;
            }
          } else {
            this.data.unhandle++;
          }
        });
      }
    },
  };

  private init() {
    this.data = {
      handled: 0,
      unhandle: 0,
      misinform: 0,
    };
  }

  onselect(state: number) {
    if (this.selecteds.includes(state)) {
      this.selecteds = this.selecteds.filter((x) => x !== state);
    } else {
      this.selecteds.push(state);
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
