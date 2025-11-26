import { ILocation } from '../../../../../../../../common/data-core/models/model.interface';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';

export class SystemMainMapAMapHeatmapController {
  constructor(private container: Loca.Container) {
    this.heatmap = this.init();
  }

  private heatmap: Loca.HeatMapLayer;
  private opts: Loca.HeatMapLayerStyle = {
    radius: 20,
    unit: 'px',
    height: 90,
    // radius: 10,
    // unit: 'px',
    // height: 10,
    gradient: {
      0: 'rgb(0, 255, 0)',
      0.5: '#ffea00',
      1.0: 'red',
    },
    value: function (index: number, feature: any) {
      return feature.properties.count;
    },
    min: 0,
    max: 1, //4.6
    heightBezier: [0, 0.53, 0.37, 0.98],
  };

  private init() {
    let heatmap = new Loca.HeatMapLayer({
      zIndex: 116,
      opacity: 1,
      visible: true,
      zooms: [2, 22],
    });
    return heatmap;
  }

  load(datas: ILocation[]) {
    let points = datas
      .filter((x) => !!x.Location)
      .map<[number, number]>((x) => {
        return [
          x.Location?.GCJ02.Longitude || 0,
          x.Location?.GCJ02.Latitude || 0,
        ];
      });
    let source = points.map((x) => {
      return { count: 1 };
    });
    let json = GeoTool.point.convert.json.points(points, source);
    let geo = new Loca.GeoJSONSource({ data: json });
    this.heatmap.setSource(geo, {
      radius: 20,
      unit: 'px',
      height: 90,
      // radius: 10,
      // unit: 'px',
      // height: 10,
      gradient: {
        // 0.2: '#3006e3',
        // 0.4: '#38baff',
        0: '#23e353',
        0.4: 'yellow',
        0.6: '#fde546',
        0.8: '#ff8625',
        1: '#ca2828',
      },
      value: function (index: number, feature: any) {
        return feature.properties.count;
      },
      min: 0,
      max: 4.6,
      heightBezier: [0.2, 0.4, 0.8, 1],
    });
    this.container.add(this.heatmap);
  }

  clear() {
    this.container.remove(this.heatmap);
  }
}
