import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';

@Component({
  selector: 'ias-system-task-file-details-map-panel-position',
  imports: [CommonModule, TextSpaceBetweenDirective],
  templateUrl: './system-task-file-details-map-panel-position.component.html',
  styleUrl: './system-task-file-details-map-panel-position.component.less',
})
export class SystemTaskFileDetailsMapPanelPositionComponent
  implements OnChanges
{
  @Input() icon = '';
  @Input() title = '';
  @Input('position') _position?: [number, number];
  @Input() fixed = false;
  @Output() fixedChange = new EventEmitter<boolean>();

  constructor(private toastr: ToastrService) {}

  position = {
    wgs84: [] as number[],
    gcj02: [] as number[],
    bd09: [] as number[],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['_position'] && changes['_position'].currentValue) {
      this.init(changes['_position'].currentValue);
    }
  }

  init(position: [number, number]) {
    this.position.wgs84 = GeoTool.point.convert.gcj02.to.wgs84(
      position[0],
      position[1]
    );
    this.position.gcj02 = position;
    this.position.bd09 = GeoTool.point.convert.gcj02.to.bd09(
      position[0],
      position[1]
    );
  }

  on = {
    fixed: () => {
      this.fixed = !this.fixed;
      this.fixedChange.emit(this.fixed);
    },
    copy: (position: number[]) => {
      let text = position.join(',');
      navigator.clipboard.writeText(text).then((res) => {
        this.toastr.success('复制成功');
      });
    },
  };
}
