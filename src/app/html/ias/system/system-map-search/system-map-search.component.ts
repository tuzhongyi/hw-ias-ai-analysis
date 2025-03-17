import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputIconComponent } from '../../../../common/components/input-icon/input-icon.component';
import { SystemMapFilterType } from '../system-map/system-map.model';

@Component({
  selector: 'ias-system-map-search',
  imports: [CommonModule, FormsModule, InputIconComponent],
  templateUrl: './system-map-search.component.html',
  styleUrl: './system-map-search.component.less',
})
export class SystemMapSearchComponent implements OnInit, OnDestroy {
  @Input() name?: string;
  @Output() nameChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  constructor() {}

  Type = SystemMapFilterType;
  handle: any;

  ngOnInit(): void {
    this.handle = this.onenter.bind(this);
    window.addEventListener('keypress', this.handle);
  }
  ngOnDestroy(): void {
    if (this.handle) {
      window.removeEventListener('keypress', this.handle);
      this.handle = undefined;
    }
  }

  onenter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onsearch();
    }
  }
  onsearch() {
    this.search.emit(this.name);
  }
}
