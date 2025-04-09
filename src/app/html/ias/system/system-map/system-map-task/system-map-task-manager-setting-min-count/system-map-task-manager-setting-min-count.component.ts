import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorage } from '../../../../../../common/storage/local.storage';
import { ISystemMapStorage } from '../../../../../../common/storage/system-map-storage/system-map.storage';

@Component({
  selector: 'ias-system-map-task-manager-setting-min-count',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-map-task-manager-setting-min-count.component.html',
  styleUrl: './system-map-task-manager-setting-min-count.component.less',
})
export class SystemMapTaskManagerSettingMinCountComponent {
  @Input() max: number = 10;

  constructor(private local: LocalStorage) {
    this.config = local.system.map.get();
    if (!this.config.mintaskcount) {
      this.count = this.max;
    }
  }

  private config: ISystemMapStorage;

  public get count(): number {
    return this.config.mintaskcount || this.max;
  }
  public set count(v: number) {
    this.config.mintaskcount = v;
    this.local.system.map.set(this.config);
  }
}
