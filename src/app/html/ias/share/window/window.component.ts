import { Component } from '@angular/core';
import { WindowComponent as WindowControl } from '../../../../common/components/window-control/window.component';
import { ContentHeaderComponent } from '../header/content-header/content-header.component';

@Component({
  selector: 'ias-window',
  imports: [WindowControl, ContentHeaderComponent],
  templateUrl: './window.component.html',
  styleUrl: './window.component.less',
})
export class WindowComponent extends WindowControl {
  onclose() {
    this.close.emit();
  }
}
