import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';

@Component({
  selector: 'ias-system-task-file-details-map-panel-position',
  imports: [CommonModule, FormsModule],
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
  @Input() top = true;
  @Input() left = false;
  @Input() offset = false;
  @Output() copied = new EventEmitter<[number, number]>();

  constructor(private toastr: ToastrService) {}

  GisType = GisType;

  position = {
    type: GisType.WGS84,
    wgs84: [] as number[],
    gcj02: [] as number[],
    bd09: [] as number[],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['_position'] && this._position) {
      this.init(this._position);
    }
  }

  init(position: [number, number]) {
    if (this.offset) {
      position = [
        position[0] - GeoTool.point.offset.longitude,
        position[1] - GeoTool.point.offset.latitude,
      ];
    }
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
    _copy: {
      clipboard: (text: string) => {
        navigator.clipboard
          .writeText(text)
          .then((res) => {
            this.toastr.success('复制成功');
            this.copied.emit(this.position.gcj02 as [number, number]);
          })
          .catch((x) => {
            this.on._copy.input(text);
          });
      },
      input: (text: string) => {
        let input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        this.toastr.success('复制成功');
        document.body.removeChild(input);
        this.copied.emit(this.position.gcj02 as [number, number]);
      },
    },
    copy: () => {
      let position: number[] = [];
      switch (this.position.type) {
        case GisType.WGS84:
          position = [...this.position.wgs84];
          break;
        case GisType.GCJ02:
          position = [...this.position.gcj02];
          break;
        case GisType.BD09:
          position = [...this.position.bd09];
          break;

        default:
          break;
      }
      if (position.length != 2) return;
      let text = position.join(',');
      if (navigator.clipboard && navigator.clipboard) {
        this.on._copy.clipboard(text);
      } else {
        this.on._copy.input(text);
      }
    },
  };
}
