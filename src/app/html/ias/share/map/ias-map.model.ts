import { IMapMarkerPath } from '../../../../common/tools/path-tool/path-map/marker/map-marker.interface';
import { PathTool } from '../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../common/tools/size-tool/size.tool';

export class MapMarker implements IIASMapArgs {
  path: string | IMapMarkerPath = PathTool.image.map.point.red;
  size: [number, number] = [
    SizeTool.map.point.normal.width,
    SizeTool.map.point.normal.height,
  ];
}

export interface IIASMapArgs {
  path: string | IMapMarkerPath;
  size: [number, number];
}
