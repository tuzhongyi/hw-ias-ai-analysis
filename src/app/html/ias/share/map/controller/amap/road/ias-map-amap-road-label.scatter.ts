import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';

export class IASMapAMapRoadLabelController {
  constructor(private container: Loca.Container, public data: Road) {
    this.layer = this.init();
    this.load(data);
  }

  private layer: Loca.ScatterLayer;

  private init() {
    var scatter = new Loca.ScatterLayer({
      zIndex: 111,
      opacity: 1,
      visible: true,
      zooms: [0, 50],
    });
    return scatter;
  }

  private getStyle(
    name: string,
    center: [number, number],
    points: [number, number][]
  ): Loca.ScatterLayerStyle {
    return {
      unit: 'px',
      size: [name.length * 18, (name.length * 18) / 1.2],
      borderWidth: 0,
      texture: this.canvas.create(name),
      rotation: this.angle(center, points),
      animate: false,
    };
  }

  private load(data: Road) {
    if (data.GeoLine) {
      let points = data.GeoLine.map<[number, number]>((x) => [
        x.Longitude,
        x.Latitude,
      ]);
      let center = GeoTool.polyline.center(points) as [number, number];

      let json = GeoTool.point.convert.json.points([center]);
      let geo = new Loca.GeoJSONSource({ data: json });

      this.layer.setSource(geo);
      this.layer.setStyle(this.getStyle(data.Name, center, points));
      this.container.add(this.layer);
    }
  }

  clear() {
    this.container.remove(this.layer);
  }

  private canvas = {
    create: (name: string) => {
      let fontSize = 18;
      const padding = 5;
      const canvasSize = fontSize * name.length; // 足够显示文字

      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d')!;

      // 清除背景（透明）
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // 设置文字样式
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 在canvas中心绘制文字
      ctx.fillText(name, canvasSize / 2, canvasSize / 2);

      return canvas;
    },
  };

  private angle(center: [number, number], points: [number, number][]) {
    let lines = GeoTool.polyline.split(points);

    let line = lines.find((x) => {
      return GeoTool.line.on(x, center);
    });
    if (line) {
      let angle = GeoTool.point.direction(line[0], line[1]);
      angle -= 90;
      if (Math.abs(angle) > 90) {
        angle += 180;
        angle %= 360;
      }
      // console.log(data.Name, angle, Math.abs(angle - 180) - 90 < 45);
      return angle;
    }
    return 0;
  }

  ignore(value: boolean) {
    if (value) {
      this.layer.setOpacity(0.5);
    } else {
      this.layer.setOpacity(1);
    }
  }
}
