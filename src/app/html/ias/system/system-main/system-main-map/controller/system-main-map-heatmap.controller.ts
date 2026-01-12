import { ILocation } from '../../../../../../common/data-core/models/model.interface';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapHeatmapController {
  constructor(private amap: SystemMainMapAMapController) {}

  async load(datas: ILocation[]) {
    let heatmap = await this.amap.heatmap.get();
    heatmap.load(datas);
  }
  async clear() {
    let controller = await this.amap.heatmap.get();
    controller.clear();
  }
  destory() {
    return this.clear();
  }
  set = {
    text: (enabled: boolean) => {
      this.amap.heatmap.get().then((x) => {
        x.set.text(enabled);
      });
    },
  };
}
