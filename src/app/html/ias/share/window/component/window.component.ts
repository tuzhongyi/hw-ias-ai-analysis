import { Component } from '@angular/core';
import { WindowComponent as WindowControl } from '../../../../../common/components/window-control/window.component';
import { ContentHeaderComponent } from '../../header/content-header/content-header.component';

@Component({
  selector: 'ias-window',
  imports: [WindowControl, ContentHeaderComponent],
  templateUrl: './window.component.html',
  styleUrl: './window.component.less',
})
export class WindowComponent extends WindowControl {
  protected override _style: any = {
    width: '80%',
    height: '80%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    paddingTop: 0,
  };

  onclose() {
    this.close.emit();
  }
}
