import { HtmlTool } from '../html-tool/html.tool';

export class SizeWindowTool {
  /** 当前屏幕缩放倍率，与 screen-4k.less 的媒体查询保持同步 */
  static get zoom(): number {
    if (window.innerWidth >= 3840) return 2;
    if (window.innerWidth >= 2560 && window.innerWidth <= 3839) return 1.33;
    if (window.devicePixelRatio >= 2 && window.innerWidth >= 1920) return 2;
    if (window.devicePixelRatio >= 1.25 && window.innerWidth >= 1920) return 1.33;
    return 1;
  }

  max = {
    width: 'calc(100% - 10px)',
    height: 'calc(100% - 10px)',
  };

  full = {
    width: '100%',
    height: '100%',
  };
  body = {
    border: 'none',
    top: '108px',
    transform: 'none',
    left: 0,
    'box-shadow': 'none',
    display: 'none',
  };

  large = {
    width: this.px(
      HtmlTool.screen.has.head.from.height(
        screen.availHeight * 0.75,
        16 / 9,
        60 + 12 + 20 + 4,
        (20 + 2) * 2,
      ),
    ),
    height: this.px(`${screen.availHeight * 0.75}`),
  };

  middle = {
    width: '56%',
    height: '80%',
  };
  simple = {
    width: this.px('500'),
    height: 'auto',
  };

  video = {
    path: {
      width: this.px(`${screen.availWidth * 0.85}`),
      height: this.px(
        HtmlTool.screen.has.head.from.width(
          screen.availWidth * 0.85,
          16 / 9,
          -200,
        ),
      ),
    },
  };

  /** 将 px 值字符串按当前屏幕缩放倍率反向补偿 */
  private px(value: string): string {
    return `${parseFloat(value) / SizeWindowTool.zoom}px`;
  }
}
