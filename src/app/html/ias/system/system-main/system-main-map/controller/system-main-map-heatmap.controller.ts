import { ILocation } from '../../../../../../common/data-core/models/model.interface';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapHeatmapController {
  constructor(private amap: SystemMainMapAMapController) {}
  private loaded = false;
  async load(datas: ILocation[]) {
    let heatmap = await this.amap.heatmap.get();
    heatmap.load(datas);
    this.loaded = true;
  }
  async clear() {
    let controller = await this.amap.heatmap.get();
    controller.clear();
    this.loaded = false;
  }
  destory() {
    return this.clear();
  }
}
