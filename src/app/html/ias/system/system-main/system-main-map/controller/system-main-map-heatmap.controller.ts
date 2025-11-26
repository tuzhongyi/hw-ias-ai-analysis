import { ILocation } from '../../../../../../common/data-core/models/model.interface';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapHeatmapController {
  constructor(private amap: SystemMainMapAMapController) {}

  load(datas: ILocation[]) {
    this.amap.heatmap.get().then((x) => {
      x.load(datas);
    });
  }
  async clear() {
    let controller = await this.amap.heatmap.get();
    controller.clear();
  }
  destory() {
    return this.clear();
  }
}
