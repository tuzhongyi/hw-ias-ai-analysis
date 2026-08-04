import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { RoadObjectType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemModuleRoadObjectDetailsImageComponent } from '../../../system-module-road-object/system-module-road-object-details/system-module-road-object-details-image/system-module-road-object-details-image.component';
import { SystemModuleRoadObjectDetailsMapLineComponent } from '../../../system-module-road-object/system-module-road-object-details/system-module-road-object-details-map-line/system-module-road-object-details-map-line.component';
import { SystemModuleRoadObjectDetailsMapComponent } from '../../../system-module-road-object/system-module-road-object-details/system-module-road-object-details-map/system-module-road-object-details-map.component';
import {
  PickupLineModel,
  PickupModel,
  PickupPointModel,
} from '../../../system-module-road-object/system-module-road-object-video/system-module-road-object-video-manager/system-module-road-object-video-manager.model';
import { SystemModuleRoadObjectStockDetailsInfoComponent } from '../system-module-road-object-stock-details-info/system-module-road-object-stock-details-info.component';
import { SystemModuleRoadObjectStockDetailsInfoSource } from '../system-module-road-object-stock-details-info/system-module-road-object-stock-details-info.source';
import { SystemModuleRoadObjectStockDetailsManagerBusiness } from './system-module-road-object-stock-details-manager.business';
import { SystemModuleRoadObjectStockDetailsManagerWindow } from './system-module-road-object-stock-details-manager.window';

@Component({
  selector: 'ias-system-module-road-object-stock-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadObjectDetailsMapComponent,
    SystemModuleRoadObjectDetailsMapLineComponent,
    SystemModuleRoadObjectStockDetailsInfoComponent,
    SystemModuleRoadObjectDetailsImageComponent,
  ],
  templateUrl:
    './system-module-road-object-stock-details-manager.component.html',
  styleUrl: './system-module-road-object-stock-details-manager.component.less',
  providers: [
    SystemModuleRoadObjectStockDetailsManagerBusiness,
    SystemModuleRoadObjectStockDetailsInfoSource,
  ],
})
export class SystemModuleRoadObjectStockDetailsManagerComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  @Input() operable = true;
  @Input() data?: RoadObjectStock;
  @Output() picture = new EventEmitter<RoadObjectStock>();
  @Output() ok = new EventEmitter<RoadObjectStock>();
  @Output() close = new EventEmitter<void>();
  @Input() pickup?: EventEmitter<PickupModel>;

  constructor(
    private business: SystemModuleRoadObjectStockDetailsManagerBusiness,
    private source: SystemModuleRoadObjectStockDetailsInfoSource,
    private toastr: ToastrService,
  ) {}

  RoadObjectType = RoadObjectType;
  model = new RoadObjectStock();
  window = new SystemModuleRoadObjectStockDetailsManagerWindow();
  In = {
    point: signal(true),
    line: signal(false),
  };
  linestepeditable = true;
  private subscription = new Subscription();

  private init() {
    let obj = new RoadObjectStock();

    this.source.divisions.then((x) => {
      if (x.length == 1) {
        obj.DivisionId = x[0].Id;
      }
    });

    obj.Location = new GisPoints();

    return obj;
  }
  private regist() {
    if (this.pickup) {
      let sub = this.pickup.subscribe((picked) => {
        this.model = this.init();
        this.model.ObjectType = picked.objecttype;
        this.model.Address = picked.address;
        this.image.data = picked.capture.buffer;

        this.image.load.emit(picked.capture.src);

        if (picked.type == 'point') {
          let data = picked as PickupPointModel;
          this.load.pickup.point(data);
        } else if (picked.type == 'line') {
          let data = picked as PickupLineModel;
          this.load.pickup.line(data);
        }
      });
      this.subscription.add(sub);
    }
  }

  load = {
    pickup: {
      point: (data: PickupPointModel) => {
        this.model = this.init();
        this.model.ObjectType = data.objecttype;
        this.model.Address = data.address;
        this.image.data = data.capture.buffer;
        this.image.load.emit(data.capture.src);
        this.model.Location = GisPoints.create(data.point, GisType.GCJ02);
        this.map.point.load(this.model);
      },
      line: (data: PickupLineModel) => {
        this.data = data.source;
        this.linestepeditable = data.auto;
        if (data.source) {
          this.model = Object.assign(this.init(), data.source);
        } else {
          this.model = this.init();
          this.model.ObjectType = data.objecttype;
          this.model.Address = data.address;
          this.image.data = data.capture.buffer;
          this.image.load.emit(data.capture.src);
          this.model.IsGeoLine = true;
        }

        this.map.line.editing.set(true);

        let first = data.line[0];
        this.map.point.gcj02 = first;
        this.model.Location = GisPoints.create(first, GisType.GCJ02);
        this.map.line.source = [...data.line];
        this.map.line.on.step(this.map.line.step);
        this.map.point.load(this.model);
      },
    },
  };

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(this.init(), this.data);
      this.map.load(this.model);
    } else {
      this.model = this.init();
    }
    this.regist();
  }
  ngAfterViewChecked(): void {
    // this.In.point.set(
    //   this.source.points.findIndex((x) => x.Value == this.model.ObjectType) >=
    //     0,
    // );
    this.In.line.set(
      this.source.lines.findIndex((x) => x.Value == this.model.ObjectType) >= 0,
    );
    this.In.point.set(!this.In.line());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private get check() {
    if (!this.model.Name) {
      this.toastr.warning('请填写部件名称');
      return false;
    }
    if (!this.model.ImageUrl && !this.image.data) {
      this.toastr.warning('请上传部件图片');
      return false;
    }
    if (this.model.ObjectType != RoadObjectType.CycleLaneSeparator) {
      if (!this.map.point.wgs84) {
        this.toastr.warning('请设置部件位置');
        return false;
      }
    }
    return true;
  }

  on = {
    error: (e: Error) => {
      let message = '';
      if (typeof e == 'string') {
        message = e;
      } else {
        message = e.message;
      }
      this.toastr.error(message);
    },
    change: (data: RoadObjectStock) => {
      this.map.type = data.ObjectType;
      wait(() => {
        return this.map.line.inited;
      }).then(() => {
        this.map.line.editing.set(false);
        this.map.line.editing.set(false);
        if (this.In.line()) {
          if (this.data) {
            this.map.line.editing.set(true);
          } else {
            this.map.line.creating.set(true);
          }
        }
      });
    },
    create: async () => {
      if (this.check) {
        if (!this.image.data) {
          return;
        }
        if (this.model.IsGeoLine) {
          this.model.GeoLine = [...this.map.line.datas];
          let first = this.model.GeoLine[0];
          this.model.Location = GisPoints.create(
            [first.Longitude, first.Latitude],
            GisType.GCJ02,
            first,
          );
        } else {
          if (this.map.point.wgs84) {
            let point = GisPoint.create(
              this.map.point.wgs84.Longitude,
              this.map.point.wgs84.Latitude,
              GisType.WGS84,
              this.map.point.wgs84,
            );
            this.model.Location.set(point, GisType.WGS84);
          }
        }

        this.business
          .create(this.model, this.image.data)
          .then((x) => {
            this.data = x;
            this.toastr.success('部件创建成功');
            this.ok.emit(this.data);
            this.close.emit();
          })
          .catch((e) => {
            console.error(e);
            this.toastr.error('部件创建失败');
          });
      }
    },
    update: async () => {
      if (this.check) {
        if (this.map.point.wgs84) {
          let point = GisPoint.create(
            this.map.point.wgs84.Longitude,
            this.map.point.wgs84.Latitude,
            GisType.WGS84,
            this.map.point.wgs84,
          );
          this.model.Location.set(point, GisType.WGS84);
        }

        this.business
          .update(this.model)
          .then((x) => {
            this.data = x;
            this.toastr.success('部件修改成功');
            this.ok.emit(this.data);
            this.close.emit();
          })
          .catch((e) => {
            console.error(e);
            this.toastr.error('部件修改失败');
          });
      }
    },
    cancel: () => {
      this.close.emit();
    },
  };

  save() {}

  map = {
    type: undefined as RoadObjectType | undefined,
    load: (data: RoadObjectStock) => {
      if (data.IsGeoLine && data.GeoLine) {
        this.map.line.source = data.GeoLine.map(
          (x) => [x.Longitude, x.Latitude] as [number, number],
        );
        this.map.line.load(data);
      } else {
        this.map.point.load(data);
      }
    },
    line: {
      inited: false,
      creating: signal<boolean>(false),
      editing: signal<boolean>(false),
      step: 20,
      source: [] as [number, number][],
      datas: [] as GisPoint[],
      load: (data: RoadObjectStock) => {
        if (data.IsGeoLine && data.GeoLine) {
          this.map.line.datas = [...data.GeoLine];
        }
      },
      on: {
        inited: () => {
          this.map.line.inited = true;
        },
        step: (step: number) => {
          let line = GeoTool.polyline.sampleLineByDistance(
            this.map.line.source,
            step,
          );
          this.model.GeoLine = line.map((x) => {
            let point = GisPoint.create(x[0], x[1], GisType.GCJ02);
            return point;
          });
          this.map.line.load(this.model);
        },
      },
    },
    point: {
      wgs84: undefined as GisPoint | undefined,
      gcj02: [0, 0] as [number, number],

      get: {
        address: new EventEmitter<[number, number]>(),
        locate: new EventEmitter<[number, number]>(),
      },
      locate: () => {
        this.map.point.get.locate.emit(this.map.point.gcj02);
      },
      load: (data: RoadObjectStock) => {
        if (data.Location) {
          this.map.point.wgs84 = data.Location.WGS84;
          this.map.point.gcj02 = [
            data.Location.GCJ02.Longitude,
            data.Location.GCJ02.Latitude,
          ];
        }

        this.map.type = data.ObjectType;
      },
      on: {
        wgs84: (data: GisPoint, sync = false) => {
          this.map.point.wgs84 = Object.assign(new GisPoint(), data);
          this.model.Location = new GisPoints();
          this.model.Location.set(data, GisType.WGS84);
          this.map.point.gcj02 = GeoTool.point.convert.wgs84.to.gcj02(
            this.map.point.wgs84.Longitude,
            this.map.point.wgs84.Latitude,
          );
        },
        gcj02: (data: [number, number], sync = false) => {
          let wgs84 = GeoTool.point.convert.gcj02.to.wgs84(data[0], data[1]);
          let point = new GisPoint();
          point.GisType = GisType.WGS84;
          point.Altitude = 0;
          point.Longitude = wgs84[0];
          point.Latitude = wgs84[1];
          this.map.point.wgs84 = point;
          if (sync) {
            this.map.point.on.wgs84(point);
          }
        },
        address: (address: string) => {
          this.model.Address = address;
        },
      },
    },
  };

  image = {
    hidden: false,
    data: undefined as ArrayBuffer | undefined,
    load: new EventEmitter<string>(),
    upload: (data: ArrayBuffer) => {
      this.image.data = data;
    },
    open: () => {
      this.picture.emit(this.model);
    },
  };
}
