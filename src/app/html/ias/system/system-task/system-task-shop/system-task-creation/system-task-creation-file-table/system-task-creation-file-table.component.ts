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
import { SystemTaskCreationFileModel } from './system-task-creation-file-table.model';

@Component({
  selector: 'ias-system-task-creation-file-table',
  imports: [CommonModule],
  templateUrl: './system-task-creation-file-table.component.html',
  styleUrl: './system-task-creation-file-table.component.less',
})
export class SystemTaskCreationFileTableComponent implements OnInit, OnDestroy {
  @Input() selecteds: SystemTaskCreationFileModel[] = [];
  @Output() selectedsChange = new EventEmitter<SystemTaskCreationFileModel[]>();

  @Input() load?: EventEmitter<SystemTaskCreationFileModel[]>;

  constructor() {}

  widths = ['65px', '60px', 'auto', '200px', '100px'];
  datas: SystemTaskCreationFileModel[] = [];

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

  onselect(item: SystemTaskCreationFileModel) {
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
