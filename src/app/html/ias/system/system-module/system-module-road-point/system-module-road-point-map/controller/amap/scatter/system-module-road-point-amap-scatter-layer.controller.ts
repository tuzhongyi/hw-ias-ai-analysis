import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { GeoTool } from '../../../../../../../../../common/tools/geo-tool/geo.tool';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';
import { SystemModuleRoadPointAMapScatterLabelController } from './system-module-road-point-amap-scatter-label.controller';
import { SystemModuleRoadPointAMapScatterPointController } from './system-module-road-point-amap-scatter-point.controller';

export class SystemModuleRoadPointAMapScatterLayerController {
  constructor(private container: Loca.Container) {}

  /**
   * 三个图层都要等真有数据了再建。
   * Loca 2.0 和地图共用同一个 WebGL 上下文，一个没有数据的空图层
   * （建出来但没 setSource / setStyle 的 ScatterLayer、ZMarkerLayer、PointLayer）
   * 会把底图瓦片一起拖没：地图对象本身全是活的（缩放、setCenter、setCity 都正常，
   * 容器和画布尺寸也对），但容器里一块瓦片都渲染不出来 —— 看着就跟地图没加载出来一样。
   * 没数据的时候压根不该有这些图层，所以改成 load() 里再创建
   */
  private layers?: {
    scatter: Loca.ScatterLayer;
    label: SystemModuleRoadPointAMapScatterLabelController;
    point: SystemModuleRoadPointAMapScatterPointController;
  };
  private loaded = false;

  private create() {
    return {
      scatter: new Loca.ScatterLayer({
        zIndex: 1000,
        opacity: 1,
        visible: true,
        zooms: [17.5, 26],
      }),
      label: new SystemModuleRoadPointAMapScatterLabelController(
        this.container
      ),
      point: new SystemModuleRoadPointAMapScatterPointController(
        this.container
      ),
    };
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
    if (!this.layers) {
      this.layers = this.create();
    }
    let layers = this.layers;

    let points = datas.map((x) => {
      let gcj02 = x.Location?.GCJ02;
      return [gcj02?.Longitude, gcj02?.Latitude] as [number, number];
    });
    let json = GeoTool.point.convert.json.points(points, datas);
    let geo = new Loca.GeoJSONSource({ data: json });
    layers.scatter.setSource(geo);
    layers.scatter.setStyle(this.style);
    this.container.add(layers.scatter);
    layers.label.load(geo);
    layers.point.load(datas, { zooms: IASMapAMapConfig.point.zooms });
    this.container.animate.start();
    this.loaded = true;
  }

  clear() {
    if (this.loaded && this.layers) {
      this.container.animate.stop();
      this.container.remove(this.layers.scatter);
      this.loaded = false;
    }
  }

  select(data: RoadPoint) {}
  blur() {}
}
