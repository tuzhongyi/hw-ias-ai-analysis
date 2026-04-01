import { ColorTool } from '../../../../../../common/tools/color/color.tool';

export class IASMapAMapConfig {
  static icon = {
    zooms: [16.8, 50] as [number, number],
  };

  static point = {
    zooms: [0, 16.8] as [number, number],
  };

  static road = {
    color: {
      normal: '#aaaaaa',
      selected: '#ff6600',
    },
  };
  // '#32b33e' '#38daff'
  static path = {
    color: [ColorTool.redlight, ColorTool.green],
  };
}
