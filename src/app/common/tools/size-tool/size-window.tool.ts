import { HtmlTool } from '../html-tool/html.tool';

export class SizeWindowTool {
  /** 当前屏幕缩放倍率，与 screen-4k.less / screen-32-9.less 保持同步 */
  static get zoom(): number {
    // 优先从 html class 读取（URL 参数 ?screen= 驱动模式）
    const cls = document.documentElement.classList;
    if (cls.contains('screen-4k')) return 2;
    if (cls.contains('screen-2k')) return 1.33;
    if (cls.contains('screen-32-9')) return 1;
    if (cls.contains('screen-scale-150')) return 0.67;
    if (cls.contains('screen-scale-175')) return 0.57;
    if (cls.contains('screen-scale-200')) return 0.5;

    // fallback：原有媒体查询逻辑（向后兼容无 ?screen= 参数的场景）
    let ratio = window.innerWidth / window.innerHeight;
    // 32:9 超宽屏不缩放
    if (ratio >= 31 / 9) return 1;
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
