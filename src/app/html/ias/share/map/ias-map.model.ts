import { GisPoint } from '../../../../common/data-core/models/arm/gis-point.model';
import { IMapMarkerPath } from '../../../../common/tools/path-tool/path-map/marker/map-marker.interface';
import { PathTool } from '../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../common/tools/size-tool/size.tool';

export class MapMarkerStyle implements IIASMapArgs {
  path: string | IMapMarkerPath = PathTool.image.map.point.red;
  size: [number, number] = [
    SizeTool.map.point.normal.width,
    SizeTool.map.point.normal.height,
  ];
  offset?: [number, number];
}

export class MapMarker extends MapMarkerStyle {
  constructor(args: IIASMapArgs) {
    super();
    this.path = args.path;
    this.size = args.size;
  }
  location = new GisPoint();
}

export interface IIASMapArgs {
  path: string | IMapMarkerPath;
  size: [number, number];
  offset?: [number, number];
}
export interface IIASMapMarkerEvent<T> {
  click?: (data: T) => void;
  dblclick?: (data: T) => void;
  mouseover?: (data: T) => void;
  mouseout?: (data?: T) => void;
}
