import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadControlComponent } from '../../../../common/components/upload-control/upload-control.component';
import {
  FileReadType,
  UploadControlFile,
  UploadControlFileInfo,
} from '../../../../common/components/upload-control/upload-control.model';
import { UpgradeStatus } from '../../../../common/data-core/models/arm/upgrade-status.model';
import { ManagementSystemMaintainConfigUpgradeBusiness } from './management-system-maintain-config-upgrade.business';

@Component({
  selector: 'ias-management-system-maintain-config-upgrade',
  imports: [CommonModule, UploadControlComponent],
  templateUrl: './management-system-maintain-config-upgrade.component.html',
  styleUrl: './management-system-maintain-config-upgrade.component.less',
  providers: [ManagementSystemMaintainConfigUpgradeBusiness],
})
export class ManagementSystemMaintainConfigUpgradeComponent implements OnInit {
  @Output() upgrade = new EventEmitter<ArrayBuffer>();
  @Input() doing?: EventEmitter<void>;

  constructor(
    private business: ManagementSystemMaintainConfigUpgradeBusiness
  ) {}

  file?: ArrayBuffer;
  type = FileReadType.ArrayBuffer;
  filename = '';

  status?: UpgradeStatus;
  handle?: NodeJS.Timeout;

  ngOnInit(): void {
    if (this.doing) {
      this.doing.subscribe(() => {
        this.load();
      });
    }
  }

  private load() {
    this.business.load().then((x) => {
      this.status = x;
      if (this.status.Error) {
        this.stop();
      }
      if (this.status.Upgrading) {
        this.stop();
      }
    });
  }

  private keep() {
    this.handle = setTimeout(() => {
      this.load();
      this.keep();
    }, 1000);
  }
  private stop() {
    if (this.handle) {
      clearTimeout(this.handle);
      this.handle = undefined;
    }
  }

  onstart(info: UploadControlFileInfo) {
    this.filename = info.filename;
  }
  onfile(file: UploadControlFile) {
    this.file = file.data as ArrayBuffer;
  }

  onupgrade() {
    if (this.file) {
      console.log(this.file);
      // this.upgrade.emit(this.file);
    }
  }
}
