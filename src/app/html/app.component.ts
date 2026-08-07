import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { IframeScaleDetectorService } from '../common/services/iframe-scale-detector.service';
import { ScreenType } from '../common/services/screen-type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
})
export class AppComponent {
  title = 'hw-ias-ai-analysis';

  constructor(
    private router: Router,
    _scale: IframeScaleDetectorService,
  ) {
    // iframe 检测：嵌入 iframe 时禁用所有环境适配
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.applyScreenClass();
      });
  }

  /** 从 URL 读取 ?screen= 参数，设置 <html> 的 screen-* class */
  private applyScreenClass(): void {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf('?');
    if (queryIndex < 0) {
      this.clearScreenClass();
      return;
    }
    const queryString = hash.substring(queryIndex + 1);
    const params = new URLSearchParams(queryString);
    const screen = params.get('screen');

    // 移除旧的 screen class
    this.clearScreenClass();

    // 添加新的 screen class
    if (screen) {
      document.documentElement.classList.add(`screen-${screen}`);
    }
  }

  private clearScreenClass(): void {
    const cls = document.documentElement.classList;
    Object.values(ScreenType).forEach((t) => {
      cls.remove(`screen-${t}`);
    });
  }
}
