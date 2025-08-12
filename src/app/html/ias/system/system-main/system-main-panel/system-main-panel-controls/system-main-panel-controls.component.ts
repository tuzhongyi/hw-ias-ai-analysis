import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ias-system-main-panel-controls',
  imports: [],
  templateUrl: './system-main-panel-controls.component.html',
  styleUrl: './system-main-panel-controls.component.less',
})
export class SystemMainPanelControlsComponent {
  @Input() listclicked = false;
  @Output() listclickedChange = new EventEmitter<boolean>();

  on = {
    list: () => {
      this.listclicked = !this.listclicked;
      this.listclickedChange.emit(this.listclicked);
    },
  };
}
