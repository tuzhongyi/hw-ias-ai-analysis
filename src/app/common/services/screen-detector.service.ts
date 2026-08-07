import { Injectable } from '@angular/core';
import { ScreenType } from './screen-type';

/**
 * 屏幕类型检测服务
 *
 * 登录时调用 detect() 确定当前屏幕类型，结果通过 URL 参数 ?screen= 传递，
 * 配合 html.screen-* class 选择器替换原有的 CSS @media 查询适配。
 *
 * 检测逻辑与 screen-4k.less / screen-32-9.less / screen-windows-scale.less 的媒体查询保持同步。
 */
@Injectable({ providedIn: 'root' })
export class ScreenDetectorService {
  /** 检测当前屏幕类型（静态方法，无需注入即可调用） */
  static detect(): ScreenType {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ratio = w / h;
    const dpr = window.devicePixelRatio;

    // 32:9 超宽屏优先判定（避免与 4K 的宽度判定冲突）
    if (ratio >= 31 / 9) return ScreenType._32_9;

    // 4K 物理分辨率
    if (w >= 3840) return ScreenType._4k;

    // 2K 物理分辨率
    if (w >= 2560 && w <= 3839) return ScreenType._2k;

    // 通过 DPR 检测 4K/2K（1080p 屏 + 高 DPI 缩放）
    if (dpr >= 2 && w >= 1920) return ScreenType._4k;
    if (dpr >= 1.25 && w >= 1920) return ScreenType._2k;

    // Windows 系统缩放（非 4K/2K 物理屏，宽度 < 1920）
    if (dpr >= 1.4 && dpr <= 1.6 && w < 1920) return ScreenType.scale150;
    if (dpr >= 1.65 && dpr <= 1.85 && w < 1920) return ScreenType.scale175;
    if (dpr >= 1.9 && w < 1920) return ScreenType.scale200;

    return ScreenType.normal;
  }

  /** 根据 ScreenType 获取对应的 CSS class 后缀 */
  static className(type: ScreenType): string {
    return `screen-${type}`;
  }
}
