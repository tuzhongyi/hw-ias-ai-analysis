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
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { wait } from '../../../../../../../common/tools/wait';
import { IASMapRoadBusiness } from '../../../../../share/map/business/ias-map-road.business';
import { SystemModuleRoadPointDetailsMapController } from './controller/system-module-road-point-details-map.controller';

@Component({
  selector: 'ias-system-module-road-point-details-map',
  imports: [],
  templateUrl: './system-module-road-point-details-map.component.html',
  styleUrl: './system-module-road-point-details-map.component.less',
  providers: [IASMapRoadBusiness],
})
export class SystemModuleRoadPointDetailsMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() location: [number, number] = [0, 0];
  @Output() locationChange = new EventEmitter<[number, number]>();
  @Input() raduis? = 15;
  @Output() raduisChange = new EventEmitter<number>();

  constructor(private business: IASMapRoadBusiness) {}

  private subscription = new Subscription();
  private controller = new SystemModuleRoadPointDetailsMapController(
    this.subscription,
  );
  private inited = false;

  private change = {
    location: (simple: SimpleChange) => {
      if (simple) {
        if (GeoTool.point.check(this.location)) {
          this.controller.map.move(this.location);
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.location(changes['location']);
    this.load.raduis();
  }

  private load = {
    road: async () => {
      // 路网是底图，两个分支都要画；但它只在「没有坐标」时才用来定视野
      let polylines: AMap.Polyline[] = [];
      try {
        let datas = await this.business.road();
        polylines = await this.controller.road.load(datas);
      } catch (e) {}

      if (GeoTool.point.check(this.location)) {
        // 有坐标：视野就归这个坐标，路网和城市都不许再动它
        await this.controller.map.move(this.location);
      } else if (polylines.length > 0) {
        // 没坐标、路网画出来了：按路网定位，圆跟着摆到路网中心
        let center = await this.controller.map.focus(polylines, true);
        this.locate(center);
      } else {
        // 没坐标、路网也没画出来：落到城市，圆等城市真落地了再摆
        this.business.division().then((division) => {
          this.controller.map.city(division.Name);
        });
      }
      this.inited = true;
    },
    raduis: async () => {
      await wait(() => {
        return this.inited;
      });
      if (GeoTool.point.check(this.location)) {
        this.controller.circle.set({
          radius: this.raduis,
          center: this.location,
        });
      }
    },
  };

  ngOnInit(): void {
    this.regist();
    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }

  private regist() {
    let sub_1 = this.controller.event.circel.change.subscribe((x) => {
      this.raduis = x;
      this.raduisChange.emit(x);
    });
    this.subscription.add(sub_1);
    let sub_2 = this.controller.event.circel.move.subscribe((x) => {
      this.location = x;
      this.locationChange.emit(x);
    });
    this.subscription.add(sub_2);

    let sub_3 = this.controller.event.city.subscribe((x) => {
      this.locate(x);
    });
    this.subscription.add(sub_3);

    // 双击地图 = 把可编辑圆的圆心挪到双击的位置。
    // 走的是和拖动圆一样的路径：圆自己摆过去，坐标同时往上报
    let sub_4 = this.controller.event.dblclick.subscribe((x) => {
      this.controller.circle.set({ radius: this.raduis, center: x });
      this.location = x;
      this.locationChange.emit(x);
    });
    this.subscription.add(sub_4);
  }

  /**
   * 坐标和圆一起摆到 center。只在「本来没有坐标」时才做 ——
   * 有坐标的话视野归坐标，路网中心和城市中心都不该覆盖它。
   * 城市兜底是异步落地的，要等落地后再调，否则摆到的是城市之前的那个中心
   */
  private locate(center: [number, number]) {
    if (GeoTool.point.check(this.location)) {
      return;
    }
    this.location = center;
    this.locationChange.emit(center);
    this.controller.circle.set({ radius: this.raduis, center });
  }
}
