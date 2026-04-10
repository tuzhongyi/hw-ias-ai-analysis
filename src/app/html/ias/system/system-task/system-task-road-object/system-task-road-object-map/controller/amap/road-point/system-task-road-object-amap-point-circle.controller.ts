import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';

export class SystemTaskRoadObjectAMapPointCircleController {
  constructor(private container: Loca.Container) {
    this.scatter = this.init();
  }
  private scatter: Loca.ScatterLayer;
  private loaded = false;

  private init() {
    return new Loca.ScatterLayer({
      zIndex: 1000,
      opacity: 1,
      visible: true,
      zooms: IASMapAMapConfig.icon.zooms,
    });
  }

  private style: Loca.ScatterLayerStyle = {
    unit: 'meter',
    size: function (i, feat) {
      let data = feat.properties as RoadPoint;
      return [data.Raduis ?? 0, data.Raduis ?? 0];
    },
    texture: PathTool.image.map.range.yellow,
    borderWidth: 0,
    altitude: 1,
    animate: true,
  };

  load(geo: Loca.GeoJSONSource) {
    this.scatter.setSource(geo);
    this.scatter.setStyle(this.style);
    this.container.add(this.scatter);
    this.container.animate.start();
    this.loaded = true;
  }

  clear() {
    if (this.loaded) {
      this.container.animate.stop();
      this.container.remove(this.scatter);
      this.loaded = false;
    }
  }

  select(data: RoadPoint) {}
  blur() {}
}
