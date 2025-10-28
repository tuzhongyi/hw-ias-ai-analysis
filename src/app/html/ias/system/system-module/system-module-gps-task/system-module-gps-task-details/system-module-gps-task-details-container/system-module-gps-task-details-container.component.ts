import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { AnalysisGpsTask } from '../../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { SceneImage } from '../../../../../../../common/data-core/models/arm/analysis/llm/scene-Image.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { SystemModuleGpsTaskDetailsInformationComponent } from '../system-module-gps-task-details-information/system-module-gps-task-details-information.component';
import { SystemModuleGpsTaskDetailsMapComponent } from '../system-module-gps-task-details-map/system-module-gps-task-details-map.component';
import { SystemModuleGpsTaskDetailsPictureComponent } from '../system-module-gps-task-details-picture/system-module-gps-task-details-picture.component';
import { SystemModuleGpsTaskDetailsContainerBusiness } from './system-module-gps-task-details-container.business';
import { SystemModuleGpsTaskDetailsCreater } from './system-module-gps-task-details-container.creater';

@Component({
  selector: 'ias-system-module-gps-task-details-container',
  imports: [
    CommonModule,
    SystemModuleGpsTaskDetailsPictureComponent,
    SystemModuleGpsTaskDetailsMapComponent,
    SystemModuleGpsTaskDetailsInformationComponent,
  ],
  templateUrl: './system-module-gps-task-details-container.component.html',
  styleUrl: './system-module-gps-task-details-container.component.less',
  providers: [
    SystemModuleGpsTaskDetailsCreater,
    SystemModuleGpsTaskDetailsContainerBusiness,
  ],
})
export class SystemModuleGpsTaskDetailsContainerComponent implements OnInit {
  @Input() data?: AnalysisGpsTask;
  @Output() save = new EventEmitter<AnalysisGpsTask>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private creater: SystemModuleGpsTaskDetailsCreater,
    private business: SystemModuleGpsTaskDetailsContainerBusiness,
    private toastr: ToastrService
  ) {
    this.model = this.creater.task();
  }

  model = new AnalysisGpsTask();

  ngOnInit(): void {
    if (this.data) {
      this.model = ObjectTool.copy(this.data, AnalysisGpsTask);
      if (this.model.Images && this.model.Images.length > 0) {
        this.picture.data = this.model.Images[0];
      }
    }
  }
  picture = {
    data: new SceneImage(),
    changed: {
      buffer: undefined as ArrayBuffer | undefined,
      position: undefined as number | undefined,
    },
    file: (buffer: ArrayBuffer) => {
      this.picture.changed.buffer = buffer;
    },
    position: (data: number) => {
      this.picture.changed.position = data;
      // this.picture.data.PositionNo = data;
    },
    remove: () => {
      this.picture.changed.buffer = undefined;
    },
    upload: async () => {
      if (this.picture.changed.buffer) {
        this.picture.data.PositionNo = this.picture.changed.position;
        this.picture.data.ImageUrl = await this.business.picture.upload(
          this.picture.changed.buffer
        );
      }
      if (this.picture.changed.position) {
        this.picture.data.PositionNo = this.picture.changed.position;
      }
      return this.picture.data;
    },
  };

  location = {
    value: new GisPoint(),

    map: {
      change: new EventEmitter<GisPoint>(),
      changing: (data: GisPoint) => {
        this.location.value = data;
        this.location.info.change.emit(data);
        let points = new GisPoints();
        points.set(data, data.GisType ?? GisType.GCJ02);
        this.model.Location = points;
      },
    },
    info: {
      change: new EventEmitter<GisPoint>(),
      changing: (data: GisPoint) => {
        this.location.value = data;
        this.location.map.change.emit(data);
        if (data.GisType) {
          let points = new GisPoints();
          points.set(data, data.GisType);
          this.model.Location = points;
        }
      },
    },
  };

  private check(data: AnalysisGpsTask) {
    if (!data.Name) {
      this.toastr.warning('请输入任务名称');
      return false;
    }
    if (!data.CaptureRadius) {
      this.toastr.warning('请输入拍摄半径，并且大于0');
      return false;
    }
    if (!data.Images || data.Images.length == 0) {
      this.toastr.warning('请添加任务图片');
      return false;
    }
    let image = data.Images[0];
    if (!image.ImageUrl) {
      this.toastr.warning('请添加任务图片');
      return false;
    }
    if (!image.PositionNo) {
      this.toastr.warning('请选择机位');
      return false;
    }
    return true;
  }

  on = {
    create: async () => {
      this.picture.upload().then((image) => {
        this.model.Images = [image];
        this.model.CapturePositions = this.model.Images.map(
          (x) => x.PositionNo!
        );
        if (this.check(this.model)) {
          this.business
            .create(this.model)
            .then((x) => {
              this.toastr.success('保存成功');
              this.save.emit(x);
            })
            .catch((e) => {
              this.toastr.error('保存失败');
            });
        }
      });
    },
    update: () => {
      this.picture.upload().then((image) => {
        this.model.Images = [image];
        this.model.CapturePositions = this.model.Images.map(
          (x) => x.PositionNo!
        );
        if (this.check(this.model)) {
          this.business
            .update(this.model)
            .then((x) => {
              this.toastr.success('保存成功');
              this.save.emit(x);
            })
            .catch((e) => {
              this.toastr.error('保存失败');
            });
        }
      });
    },
    cancel: () => {
      this.close.emit();
    },
  };
}
