import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { GeoTool } from '../../../../../../../../../common/tools/geo-tool/geo.tool';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';
import { SystemModuleRoadPointAMapScatterLabelController } from './system-module-road-point-amap-scatter-label.controller';
import { SystemModuleRoadPointAMapScatterPointController } from './system-module-road-point-amap-scatter-point.controller';

export class SystemModuleRoadPointAMapScatterLayerController {
  constructor(private container: Loca.Container) {
    this.scatter = this.init();
    this.label = new SystemModuleRoadPointAMapScatterLabelController(container);
    this.point = new SystemModuleRoadPointAMapScatterPointController(container);
  }
  private scatter: Loca.ScatterLayer;
  private label: SystemModuleRoadPointAMapScatterLabelController;
  private point: SystemModuleRoadPointAMapScatterPointController;
  private loaded = false;

  private init() {
    return new Loca.ScatterLayer({
      zIndex: 1000,
      opacity: 1,
      visible: true,
      zooms: [17.5, 26],
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

  load(datas: RoadPoint[]) {
    let points = datas.map((x) => {
      let gcj02 = x.Location?.GCJ02;
      return [gcj02?.Longitude, gcj02?.Latitude] as [number, number];
    });
    let json = GeoTool.point.convert.json.points(points, datas);
    let geo = new Loca.GeoJSONSource({ data: json });
    this.scatter.setSource(geo);
    this.scatter.setStyle(this.style);
    this.container.add(this.scatter);
    this.label.load(geo);
    this.point.load(datas, { zooms: IASMapAMapConfig.point.zooms });
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
