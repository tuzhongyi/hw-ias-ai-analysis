import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../common/components/window-confirm/window-confirm.component';
import { SSH } from '../../../../common/data-core/models/arm/ssh.model';
import { ManagementNetworkLocationSSHBusiness } from './management-network-location-ssh.business';
import { ManagementNetworkLocationSSHWindow } from './management-system-device-datetime.window';

@Component({
  selector: 'ias-management-network-location-ssh',
  imports: [CommonModule, WindowConfirmComponent],
  templateUrl: './management-network-location-ssh.component.html',
  styleUrl: './management-network-location-ssh.component.less',
  providers: [ManagementNetworkLocationSSHBusiness],
})
export class ManagementNetworkLocationSSHComponent implements OnInit {
  constructor(
    private business: ManagementNetworkLocationSSHBusiness,
    private toastr: ToastrService
  ) {}

  window = new ManagementNetworkLocationSSHWindow();
  data = new SSH();

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.load().then((x) => {
      this.data = x;
    });
  }

  save() {
    this.business
      .update(this.data)
      .then((x) => {
        this.data = x;
        this.toastr.success('操作成功');
      })
      .catch((e) => {
        this.toastr.error('操作失败');
      })
      .finally(() => {
        this.window.confirm.show = false;
      });
  }
}
