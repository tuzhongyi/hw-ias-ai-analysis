import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SceneLabel } from '../../../../../../../common/data-core/models/arm/analysis/llm/scene-label.model';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';
import { Polygon } from '../../../../../../../common/data-core/models/arm/polygon.model';
import { PictureCanvasDrawComponent } from '../../../../../share/picture/picture-canvas-draw/picture-canvas-draw.component';
import { SystemModuleGpsTaskPictureDrawingArgs } from './system-module-gps-task-picture-drawing.model';

@Component({
  selector: 'ias-system-module-gps-task-picture-drawing',
  imports: [CommonModule, FormsModule, PictureCanvasDrawComponent],
  templateUrl: './system-module-gps-task-picture-drawing.component.html',
  styleUrl: './system-module-gps-task-picture-drawing.component.less',
})
export class SystemModuleGpsTaskPictureDrawingComponent implements OnInit {
  @Input() args?: SystemModuleGpsTaskPictureDrawingArgs;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<SceneLabel>();

  constructor(private toastr: ToastrService) {
    this.model = this.create();
  }

  ngOnInit(): void {
    console.log(this.args);
    if (this.args) {
      this.picture.src = this.args.image;
      if (this.args.data) {
        this.model = Object.assign(this.model, this.args.data);
        this.picture.polygon = this.model.Polygon;
      }
    }
  }

  model: SceneLabel;
  private create() {
    let label = new SceneLabel();
    label.Id = 1;
    label.Name = '场景区域-1';
    label.LabelType = 1;
    return label;
  }

  picture = {
    src: '',
    polygon: [] as HowellPoint[],
  };
  draw = {
    enabled: false,
    reset: false,
    start: () => {
      this.draw.enabled = !this.draw.enabled;
    },
    over: (data: Polygon) => {
      this.model.Polygon = data.Coordinates;
      this.draw.enabled = false;
    },
  };

  private check(data: SceneLabel) {
    if (!data.Polygon || data.Polygon.length == 0) {
      alert('请绘制区域');
      return false;
    }
    return true;
  }

  on = {
    reset: () => {
      this.draw.reset = true;
      this.draw.enabled = true;
    },
    close: () => {
      this.close.emit();
    },
    save: () => {
      if (this.check(this.model)) {
        this.save.emit(this.model);
      }
    },
  };
}
