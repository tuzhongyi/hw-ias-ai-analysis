import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
}
