import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../../common/data-core/models/arm/file/file-info.model';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { wait } from '../../../../../../../../common/tools/wait';
import { IIASMapCurrent } from '../../../../../../share/map/ias-map.model';
import { FileGpsItemPercent } from '../system-module-road-object-video-map.model';
import { SystemModuleRoadObjectVideoMapController } from './controller/system-module-road-object-video-map.controller';
import { SystemModuleRoadObjectVideoMapBusiness } from './system-module-road-object-video-map-container.business';

@Component({
  selector: 'ias-system-module-road-object-video-map-container',
  imports: [CommonModule],
  templateUrl: './system-module-road-object-video-map-container.component.html',
  styleUrl: './system-module-road-object-video-map-container.component.less',
  providers: [SystemModuleRoadObjectVideoMapBusiness],
})
export class SystemModuleRoadObjectVideoMapContainerComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() objects: RoadObject[] = [];
  @Input() data?: FileInfo;
  @Input('to') _to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<FileGpsItemPercent>();
  @Output() loaded = new EventEmitter<FileGpsItem[]>();
  @Output() error = new EventEmitter<Error>();

  @Input() rectified = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();

  @Input() location?: [number, number];
  @Output() locationChange = new EventEmitter<[number, number]>();

  @Input() pickupable = false;
  @Input() pickup?: [number, number];
  @Output() pickupChange = new EventEmitter<[number, number]>();

  @Output() closest = new EventEmitter<FileGpsItem>();
  @Output() course = new EventEmitter<number>();
  @Output() objectdblclick = new EventEmitter<RoadObject>();
  @Output() objectclick = new EventEmitter<RoadObject>();
  @Output() current = new EventEmitter<IIASMapCurrent>();

  @Input() displaypoint = true;
  @Input() displayline = true;
  @Input() displayroute = true;

  @Input() linecreate?: EventEmitter<[number, number][]>;
  @Output() lineclick = new EventEmitter<RoadObject>();
  @Output() linedblclick = new EventEmitter<RoadObject>();
  @Output() mapclick = new EventEmitter<[number, number]>();

  constructor(private business: SystemModuleRoadObjectVideoMapBusiness) {}

  loading = false;
  hasdata = false;
  private time = {
    current: 0,
  };
  private subscription = new Subscription();
  private controller = new SystemModuleRoadObjectVideoMapController(
    this.subscription
  );

  ngOnInit(): void {
    this.regist.load();

    if (this.data) {
      this.load.gps(this.data, this.rectified, true);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change.rectified(changes['rectified']);
    this.change.pickup(changes['pickupable']);
    this.change.objects(changes['objects']);
    this.change.display.point(changes['displaypoint']);
    this.change.display.line(changes['displayline']);
    this.change.display.route(changes['displayroute']);
  }

  ngOnDestroy(): void {
    this.controller.destroy();
    this.subscription.unsubscribe();
  }

  private regist = {
    load: () => {
      this.regist.input.to();
      this.regist.input.line.create();
      this.regist.output.course();
      this.regist.output.trigger();
      this.regist.output.location();
      this.regist.output.pickup();
      this.regist.output.current();
      this.regist.output.object.point.dblclick();
      this.regist.output.object.point.click();
      this.regist.output.object.line.click();
      this.regist.output.object.line.dblclick();
      this.regist.output.map.click();
    },
    input: {
      to: () => {
        if (this._to) {
          let sub = this._to.subscribe((time) => {
            this.time.current = time;
            this.controller.to(time, this.displayroute).then((x) => {
              this.closest.emit(x);
            });
          });
          this.subscription.add(sub);
        }
      },
      line: {
        create: () => {
          if (this.linecreate) {
            let sub = this.linecreate.subscribe((line) => {
              this.controller.pickup.line.create(line);
            });
            this.subscription.add(sub);
          }
        },
      },
    },
    output: {
      course: () => {
        let sub = this.controller.event.course.subscribe((x) => {
          this.course.emit(x);
        });
        this.subscription.add(sub);
      },
      trigger: () => {
        let sub = this.controller.event.trigger.subscribe((x) => {
          this.trigger.emit(x);
        });
        this.subscription.add(sub);
      },
      location: () => {
        let sub = this.controller.event.position.subscribe((x) => {
          this.location = x;
          this.locationChange.emit(this.location);
        });
        this.subscription.add(sub);
      },
      pickup: () => {
        let sub = this.controller.event.point.subscribe((x) => {
          this.pickup = x;
          this.pickupChange.emit(this.pickup);
        });
        this.subscription.add(sub);
      },
      current: () => {
        let sub = this.controller.event.current.subscribe((x) => {
          this.current.emit(x);
        });
        this.subscription.add(sub);
      },
      map: {
        click: () => {
          let sub = this.controller.event.map.click.subscribe((x) => {
            this.mapclick.emit(x);
          });
          this.subscription.add(sub);
        },
      },
      object: {
        point: {
          dblclick: () => {
            let sub_point =
              this.controller.object.point.event.dblclick.subscribe((x) => {
                this.objectdblclick.emit(x);
              });
            this.subscription.add(sub_point);
            let sub_line = this.controller.object.line.event.dblclick.subscribe(
              (x) => {
                this.objectdblclick.emit(x);
              }
            );
            this.subscription.add(sub_line);
          },
          click: () => {
            let sub_point = this.controller.object.point.event.click.subscribe(
              (x) => {
                this.objectclick.emit(x);
              }
            );
            this.subscription.add(sub_point);
          },
        },
        line: {
          click: () => {
            let sub_line = this.controller.object.line.event.click.subscribe(
              (x) => {
                this.lineclick.emit(x);
              }
            );
            this.subscription.add(sub_line);
          },
          dblclick: () => {
            let sub_line = this.controller.object.line.event.dblclick.subscribe(
              (x) => {
                this.linedblclick.emit(x);
              }
            );
            this.subscription.add(sub_line);
          },
        },
      },
    },
  };

  private change = {
    rectified: async (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        await wait(() => {
          return this.loading == false;
        });
        try {
          this.loading = true;
          await this.controller.path.clear();
          if (this.data) {
            let datas = await this.business.gps(
              this.data.FileName,
              this.rectified
            );
            this.controller.path.load(datas, false);
            if (this.time.current) {
              this.controller.to(this.time.current);
            }
          }
        } catch (e) {
          console.error('change.rectified', e);
        } finally {
          this.loading = false;
        }
      }
    },
    pickup: (simple: SimpleChange) => {
      if (simple) {
        this.controller.pickup.point.can(this.pickupable);
        if (!this.pickupable) {
          this.controller.pickup.point.clear();
        }
      }
    },
    objects: (simple: SimpleChange) => {
      if (simple) {
        this.load.objects(this.objects);
      }
    },
    display: {
      point: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          if (this.displaypoint) {
            let points = this.objects.filter((x) => !x.IsGeoLine || !x.GeoLine);
            this.controller.object.point.load(points);
          } else {
            this.controller.object.point.clear();
          }
        }
      },
      line: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          if (this.displayline) {
            let lines = this.objects.filter((x) => x.IsGeoLine && !!x.GeoLine);
            this.controller.object.line.load(lines);
          } else {
            this.controller.object.line.clear();
          }
        }
      },
      route: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          if (this.displayroute) {
            this.controller.path.show(this.time.current);
          } else {
            this.controller.path.hide();
          }
        }
      },
    },
  };

  private load = {
    gps: async (data: FileInfo, rectified: boolean, focus: boolean) => {
      await wait(() => {
        return this.loading == false;
      });
      try {
        this.loading = true;

        await this.controller.path.clear();
        let datas = await this.business.gps(data.FileName, rectified);
        this.hasdata = datas.length > 0;
        this.loaded.emit(datas);
        if (this.hasdata) {
          await this.controller.path.load(datas, focus);
        }
      } catch (e: any) {
        this.error.emit(e);
        this.loaded.emit([]);
      } finally {
        this.loading = false;
      }
    },
    objects: (datas: RoadObject[]) => {
      let points = datas.filter((x) => !x.IsGeoLine || !x.GeoLine);
      this.controller.object.point.clear().then(() => {
        this.controller.object.point.load(points);
      });

      let lines = datas.filter((x) => x.IsGeoLine && !!x.GeoLine);
      this.controller.object.line.clear().then(() => {
        this.controller.object.line.load(lines);
      });
      this.controller.pickup.point.clear();
    },
  };
}
