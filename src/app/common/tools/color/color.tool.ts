import { ShopObjectState } from '../../data-core/enums/analysis/shop-object-state.enum';

class CanvasDrawColor {
  stroke = {
    normal: '#0f0',
    drawing: '#ffff7d',
    selected: '#ff3232',
    object: '#f00',
    rule: '#00f',
  };
  fill = {
    normal: 'rgba(0,150,0,0.3)',
    drawing: 'rgba(255,255,125,0.3)',
    selected: 'rgba(180,40,40,0.3)',
    object: 'rgba(255,0,0,0.3)',
    rule: 'rgba(0,0,255,0.3)',
  };
}

class TrashCanColor {
  [key: string]: string;
  Dry = 'rgb(44, 43, 39)';
  Wet = '#8e442f';
  Recycle = '#186cc4';
  Hazard = 'rgb(229, 49, 34)';
}

export class ColorTool {
  static canvas = new CanvasDrawColor();
  static trashcan = new TrashCanColor();
  static ShopObjectState(value: ShopObjectState) {
    switch (value) {
      case ShopObjectState.Disappeared:
        return '#ff762c';
      case ShopObjectState.Created:
        return '#23e353';
      case ShopObjectState.Existed:
        return '#1e90ff';
      default:
        return '';
    }
  }
  static TaskState(value?: number) {
    switch (value) {
      case -1:
        return '#69adff';
      case 0:
        return '#ca98f7';
      case 1:
        return '#01edf5';
      case 2:
        return '#23e353';
      case 3:
        return '#ff5151';
      default:
        return '';
    }
  }
}
