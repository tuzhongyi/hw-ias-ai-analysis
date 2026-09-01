import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WindowComponent } from '../window-control/window.component';
import { WindowViewModel } from '../window-control/window.model';

@Component({
  selector: 'question-window',
  templateUrl: './window-question.component.html',
  styleUrls: ['./window-question.component.less'],
  imports: [CommonModule, FormsModule, WindowComponent],
})
export class WindowQuestionComponent implements OnInit {
  private _style: any = {
    width: '500px',
    height: 'auto',
  };
  public get style(): any {
    return this._style;
  }
  @Input() public set style(v: any) {
    this._style = Object.assign(this._style, v);
  }
  @Input() model: WindowViewModel = new WindowViewModel();
  @Input() title: string = '提示';
  @Input() content: string = '';

  @Output() yes: EventEmitter<void> = new EventEmitter();
  @Output() no: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  on = {
    yes: () => {
      this.yes.emit();
    },
    no: () => {
      this.no.emit();
    },
    cancel: () => {
      this.cancel.emit();
    },
  };
}
