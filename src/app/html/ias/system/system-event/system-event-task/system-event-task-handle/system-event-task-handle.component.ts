import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPictureModel } from '../../../../share/picture/component/picture.model';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventTaskHandleBusiness } from './system-event-task-handle.business';

@Component({
  selector: 'ias-system-event-task-handle',
  imports: [CommonModule, PicturePolygonMultipleComponent],
  templateUrl: './system-event-task-handle.component.html',
  styleUrl: './system-event-task-handle.component.less',
  providers: [SystemEventTaskHandleBusiness],
})
export class SystemEventTaskHandleComponent {
  @Input() title = '';
  @Input() datas: IPictureModel[] = [];
  @Input('index') _index = 0;
  @Output() indexChange = new EventEmitter<number>();
  @Input() nodata = '待处置';

  constructor(private business: SystemEventTaskHandleBusiness) {}

  picture = {
    get: (id: string) => {
      return this.business.medium.picture(id);
    },
    change: (index: number) => {
      this._index = index;
      this.indexChange.emit(index);
    },
  };

  onwheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      if (this._index >= this.datas.length - 1) {
        return;
      }
      this._index++;
      this.indexChange.emit(this._index);
    } else if (e.deltaY < 0) {
      if (this._index <= 0) {
        return;
      }
      this._index--;
      this.indexChange.emit(this._index);
    } else {
    }
  }
}
