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

  static path = {
    color: ['#32b33e', ColorTool.orange, ColorTool.yellow, ColorTool.cyan],
  };
}
