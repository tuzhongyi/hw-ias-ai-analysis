import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';

export class SystemMapAMapRoadLabelController {
  constructor(private map: AMap.Map) {}

  private texts = new Map<string, AMap.Text>();

  private create(name: string, position: [number, number]) {
    var text = new AMap.Text({
      text: name,
      anchor: 'center', // 设置文本标记锚点
      draggable: false,
      bubble: true,
      angle: 0,
      style: {
        'pointer-events': 'none',
        'background-color': 'transparent',
        width: 'auto',
        'border-width': 0,
        'text-align': 'center',
        'font-size': '14px',
        color: 'white',
      },
      position: position,
    });
    return text;
  }

  add(data: Road) {
    if (data.GeoLine) {
      let points = data.GeoLine.map<[number, number]>((x) => [
        x.Longitude,
        x.Latitude,
      ]);
      let center = GeoTool.polyline.center(points);
      if (center) {
        let label = this.create(data.Name, center);
        this.map.add(label);
        this.texts.set(data.Id, label);

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
          label.setAngle(angle);
        }
      }
    }
  }
  clear() {
    if (this.texts.size > 0) {
      let datas = Array.from(this.texts.values());
      this.map.remove(datas);
      this.texts.clear();
    }
  }
  ignore(ids: string[]) {
    this.texts.forEach((text, id) => {
      if (ids.includes(id)) {
        text.setStyle({
          opacity: 1,
        });
      } else {
        text.setStyle({
          opacity: 0.5,
        });
      }
    });
  }
}
