import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-icon',
  imports: [],
  templateUrl: './input-icon.component.html',
  styleUrl: './input-icon.component.less',
})
export class InputIconComponent {
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();

  oninput(e: Event) {
    let target = e.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
