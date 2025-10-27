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
import { SystemModuleGpsTaskDetailsPictureArgs } from '../system-module-gps-task-details-picture/system-module-gps-task-details-picture.model';
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
    }
    this.creater.images().then((datas) => {
      if (this.model.Images) {
        this.model.Images.forEach((img) => {
          const index = datas.findIndex((x) => x.PositionNo == img.PositionNo);
          if (index > -1) {
            datas[index] = img;
          }
        });
      }
      this.picture.datas = datas;
    });
  }
  picture = {
    datas: [] as SceneImage[],
    changed: new Map<number, ArrayBuffer>(),
    change: (args: SystemModuleGpsTaskDetailsPictureArgs) => {
      this.picture.changed.set(args.index, args.data);
      if (this.model.Images && this.model.Images.length > args.index) {
        this.model.Images[args.index].PositionNo = args.position;
      }
    },
    remove: (index: number) => {
      if (this.picture.changed.has(index)) {
        this.picture.changed.delete(index);
      }
      if (this.model.Images && this.model.Images.length > index) {
        this.model.Images[index].ImageUrl = '';
      }
    },
    upload: async (data: AnalysisGpsTask) => {
      if (data.Images) {
        for (let i = 0; i < data.Images.length; i++) {
          if (this.picture.changed.has(i)) {
            let buffer = this.picture.changed.get(i) as ArrayBuffer;
            let id = await this.business.picture.upload(buffer);
            data.Images[i].ImageUrl = id;
          }
        }
      }
      return data;
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
    return true;
  }

  on = {
    save: async () => {
      this.picture.upload(this.model).then((model) => {
        if (model.Images) {
          model.Images = model.Images.filter((x) => x.ImageUrl);
          model.CapturePositions = model.CapturePositions.filter((x) =>
            model.Images?.some((i) => i.PositionNo == x)
          );
        }
        if (this.check(model)) {
          this.business
            .create(model)
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
