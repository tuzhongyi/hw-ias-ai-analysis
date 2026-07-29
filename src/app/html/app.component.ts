import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IframeScaleDetectorService } from '../common/services/iframe-scale-detector.service';

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
  constructor(_scale: IframeScaleDetectorService) {
    // iframe 检测：嵌入 iframe 时禁用所有环境适配
  }
}
