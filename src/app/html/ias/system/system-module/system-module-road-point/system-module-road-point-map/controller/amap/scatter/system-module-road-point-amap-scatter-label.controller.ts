import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';

export class SystemModuleRoadPointAMapScatterLabelController {
  constructor(private container: Loca.Container) {
    this.marker = this.init(container);
  }

  private marker: Loca.ZMarkerLayer;

  private init(container: Loca.Container) {
    let marker = new Loca.ZMarkerLayer({
      loca: container,
      zIndex: 1000,
      depth: false,
      zooms: IASMapAMapConfig.icon.zooms,
    });
    return marker;
  }

  load(geo: Loca.GeoJSONSource) {
    this.marker.setSource(geo);
    this.marker.setStyle({
      content: (i, feat) => {
        var props = feat.properties as RoadPoint;
        var leftColor = 'rgba(0, 28, 52, 0.6)';
        var rightColor = '#fde546aa';
        var borderColor = '#fde546aa';
        return `<div style="width: 490px; height: 128px; padding: 0 0;">
              <p style="
                display: block; 
                height:80px; 
                line-height:80px;
                font-size:40px;
                background-image: linear-gradient(to right, ${leftColor},${leftColor},${rightColor},rgba(0,0,0,0.4)); border:4px solid ${borderColor}; 
                color:#fff; 
                border-radius: 15px; 
                text-align:center; 
                margin:0; 
                padding:5px;">
                ${props.Name}
              </p>
          <span style="
          width: 50%; 
          height: 130px; 
          margin: 0 auto; 
          display: block; 
          background: url(${PathTool.image.map.range.wall});
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center center;">
          </span>
          </div>`;
      },
      unit: 'meter',
      rotation: 0,
      alwaysFront: true,
      size: function (i, feat) {
        let data = feat.properties as RoadPoint;
        let radius = (data.Raduis ?? 0) * 2;
        return [radius, radius];
      },
      altitude: -2,
    });
  }
}
