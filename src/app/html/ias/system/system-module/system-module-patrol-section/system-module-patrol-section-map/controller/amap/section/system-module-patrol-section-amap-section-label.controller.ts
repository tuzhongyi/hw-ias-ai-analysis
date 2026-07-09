import { PatrolSection } from '../../../../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { GeoTool } from '../../../../../../../../../common/tools/geo-tool/geo.tool';

export class SystemModulePatrolSectionAMapSectionLabelController {
  constructor(private map: AMap.Map) {}

  private texts = new Map<string, AMap.Text>();

  private create(name: string, position: [number, number]) {
    var text = new AMap.Text({
      text: name,
      anchor: 'center',
      draggable: false,
      angle: 0,
      style: {
        'background-color': 'transparent',
        width: '15rem',
        'border-width': 0,
        'text-align': 'center',
        'font-size': '14px',
        color: 'white',
      },
      position: position,
    });
    return text;
  }

  add(data: PatrolSection) {
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

        if (!this.visible) {
          label.hide();
        }

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
          label.setAngle(angle);
        }
      }
    }
  }

  show() {
    this.visible = true;
    this.texts.forEach((text) => {
      text.show();
    });
  }

  hide() {
    this.visible = false;
    this.texts.forEach((text) => {
      text.hide();
    });
  }

  showOnly(id: string) {
    this.visible = false;
    this.texts.forEach((text, key) => {
      if (key === id) {
        text.show();
      } else {
        text.hide();
      }
    });
  }

  clear() {
    this.visible = true;
    if (this.texts.size > 0) {
      let datas = Array.from(this.texts.values());
      this.map.remove(datas);
      this.texts.clear();
    }
  }

  private visible = true;
}
