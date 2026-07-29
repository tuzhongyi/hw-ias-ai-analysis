import { Injectable } from '@angular/core';

/**
 * 检测项目是否嵌入 iframe，若是则给 html 添加 in-iframe class，
 * 配合 screen-iframe-scale.less 禁用所有环境适配（4K / Windows缩放 / 32:9 等）。
 */
@Injectable({ providedIn: 'root' })
export class IframeScaleDetectorService {
  constructor() {
    if (window.self !== window.top) {
      document.documentElement.classList.add('in-iframe');
    }
  }
}
