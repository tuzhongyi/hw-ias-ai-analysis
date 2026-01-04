import { ShopObjectState } from '../../data-core/enums/analysis/shop-object-state.enum';
import { ShopState } from '../../data-core/enums/analysis/shop-state.enum';
import { ColorChartTool } from './color-chart.tool';

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
  static green = '#21e452';
  static red = '#ff762c';
  static orange = '#ff762c';
  static cyan = '#00f5ff';
  static yellow = '#fde546';

  static chart = new ColorChartTool();
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
  static TaskState(value?: ShopState) {
    switch (value) {
      case ShopState.Uploading:
        return '#69adff';
      case ShopState.NotStarted:
        return '#ca98f7';
      case ShopState.OnGoing:
        return '#01edf5';
      case ShopState.Finished:
        return '#23e353';
      case ShopState.Failed:
        return '#ff5151';
      default:
        return '';
    }
  }

  static EventType(value?: number) {
    switch (value) {
      case 9:
        return '#23e353';
      case 8:
        return '#ff762c';
      case 7:
        return '#1e90ff';

      default:
        return '#ddf4ff';
    }
  }

  static get = {
    index: (index: number, level = 5) => {
      // 鲜明度参数范围：1-10，默认5
      const vividLevel = Math.max(1, Math.min(10, level));

      // 使用HSL色彩空间
      const hue = (index * 137.5) % 360;

      // 线性映射鲜明度到饱和度和亮度范围
      // 鲜明度1: 饱和度30-50%, 亮度20-40%
      // 鲜明度10: 饱和度80-95%, 亮度55-75%
      const minSaturation = 30 + ((level - 1) * (80 - 30)) / 9;
      const maxSaturation = 50 + ((level - 1) * (95 - 50)) / 9;
      const minLightness = 20 + ((level - 1) * (55 - 20)) / 9;
      const maxLightness = 40 + ((level - 1) * (75 - 40)) / 9;

      const saturationRange = maxSaturation - minSaturation;
      const lightnessRange = maxLightness - minLightness;

      const saturation = minSaturation + (index % 20) * (saturationRange / 20);
      const lightness = minLightness + (index % 20) * (lightnessRange / 20);

      return this.hsl.to.hex(hue, saturation, lightness);
    },
  };

  static hsl = {
    to: {
      hex: (h: number, s: number, l: number) => {
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        if (s === 0) {
          r = g = b = l;
        } else {
          const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };

          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        const toHex = (x: number) => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      },
      rgb: (h: number, s: number, l: number) => {
        var r, g, b;
        if (s == 0) {
          r = g = b = l; // achromatic
        } else {
          var hue2rgb = function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
          R: Math.round(r * 255),
          G: Math.round(g * 255),
          B: Math.round(b * 255),
        };
      },
    },
    from: {
      rgb: (r: number, g: number, b: number) => {
        return this.rgb.to.hsl(r, g, b);
      },
    },
  };
  static rgb = {
    to: {
      hsl: (r: number, g: number, b: number) => {
        (r /= 255), (g /= 255), (b /= 255);
        var max = Math.max(r, g, b),
          min = Math.min(r, g, b);
        let l = (max + min) / 2;
        let h = l,
          s = l;
        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return { H: h, S: s, L: l };
      },
      hex: (r: number, g: number, b: number) => {
        // 将每个颜色值转换为两位的十六进制字符串
        let hex =
          '#' +
          ((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase();
        return hex;
      },
    },
    from: {
      hsl: (h: number, s: number, l: number) => {
        return this.hsl.to.rgb(h, s, l);
      },
    },
  };
  static hex = {
    to: {
      rgb: (hex: string) => {
        // 去掉#号
        hex = hex.replace('#', '');
        // 将hex值分割成三个部分，并转换为十进制
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        // 返回RGB数组
        return {
          R: r,
          G: g,
          B: b,
        };
      },
    },
    from: {
      hsl: (h: number, s: number, l: number) => {
        return this.hsl.to.hex(h, s, l);
      },
      rgb: (r: number, g: number, b: number) => {
        return this.rgb.to.hex(r, g, b);
      },
    },
  };
}
