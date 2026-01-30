import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { SystemModuleFile } from './system-module-file-upload-table.model';

@Component({
  selector: 'ias-system-module-file-upload-table',
  imports: [CommonModule],
  templateUrl: './system-module-file-upload-table.component.html',
  styleUrl: './system-module-file-upload-table.component.less',
})
export class SystemModuleFileUploadTableComponent implements OnInit, OnDestroy {
  @Input() selecteds: SystemModuleFile[] = [];
  @Output() selectedsChange = new EventEmitter<SystemModuleFile[]>();

  @Input() load?: EventEmitter<SystemModuleFile[]>;

  constructor() {}

  widths = ['65px', '60px', 'auto', '200px', '100px'];
  datas: SystemModuleFile[] = [];

  Language = Language;

  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.datas = x;
      });
      this.subscription.add(sub);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onselect(item: SystemModuleFile) {
    if (this.selecteds.includes(item)) {
      this.selecteds = this.selecteds.filter((x) => x !== item);
    } else {
      this.selecteds.push(item);
    }
    this.selectedsChange.emit(this.selecteds);
  }

  onall(e: Event) {
    let target = e.currentTarget as HTMLInputElement;
    if (target.checked) {
      this.selecteds = [...this.datas];
    } else {
      this.selecteds = [];
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
