import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';

export class SystemTaskRoadObjectAMapPointLabelController {
  constructor(private container: Loca.Container) {
    this.marker = this.init();
  }

  marker: Loca.ZMarkerLayer;
  heightFactor = 9;

  private init() {
    let marker = new Loca.ZMarkerLayer({
      zIndex: 120,
    });
    return marker;
  }

  private style: Loca.ZMarkerLayerStyle = {
    content: (i: number, feat: any) => {
      var height = this.heightFactor;
      let data = feat.properties as RoadPoint;
      return `<div>
          <p style="
          width: 400px; 
          height: 80px; 
          line-height: 80px; 
          font-size: 40px; 
          background-image:linear-gradient(to right,rgba(30,215,196,0.4),rgba(30, 215, 196, 0.3),rgba(0,0,0,0.4)); 
          border:4px solid rgba(30, 215, 196, 0.9); 
          color:#fff; 
          border-radius: 20px; 
          text-align:center; 
          margin:0;
          padding:0;
          ">
            ${data.Name}
          </p>
        </div>
        `;
    },
    unit: 'meter',
    rotation: 0,
    alwaysFront: true,
    size: (i: number, feat: any) => {
      let data = feat.properties as RoadPoint;
      let radius = data.Raduis ?? 15;
      return [radius * 2, radius];
    },
    altitude: 9,
  };

  load(geo: Loca.GeoJSONSource) {
    this.marker.setSource(geo);
    this.marker.setStyle(this.style);
    this.container.add(this.marker);
  }
}
