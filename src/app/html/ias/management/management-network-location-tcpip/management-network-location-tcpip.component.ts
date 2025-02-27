import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../common/components/window-confirm/window-confirm.component';
import { AddressingType } from '../../../../common/data-core/enums/addressing-type.enum';
import { NetworkInterface } from '../../../../common/data-core/models/arm/network-interface.model';
import { ManagementNetworkLocationTcpIpBusiness } from './management-network-location-tcpip.business';
import { ManagementNetworkLocationTcpIpWindow } from './management-system-device-datetime.window';
import { ManagementNetworkLocationTcpIpSource } from './source/management-network-location-tcpip.source';

@Component({
  selector: 'ias-management-network-location-tcpip',
  imports: [CommonModule, FormsModule, WindowConfirmComponent],
  templateUrl: './management-network-location-tcpip.component.html',
  styleUrl: './management-network-location-tcpip.component.less',
  providers: [
    ManagementNetworkLocationTcpIpBusiness,
    ManagementNetworkLocationTcpIpSource,
  ],
})
export class ManagementNetworkLocationTcpIpComponent implements OnInit {
  constructor(
    private business: ManagementNetworkLocationTcpIpBusiness,
    public source: ManagementNetworkLocationTcpIpSource,
    private toastr: ToastrService
  ) {}

  window = new ManagementNetworkLocationTcpIpWindow();
  datas: NetworkInterface[] = [];
  selected?: NetworkInterface;
  get type() {
    if (this.selected) {
      return this.selected.IPAddress.AddressingType == AddressingType.Dynamic;
    }
    return false;
  }
  set type(value: boolean) {
    if (this.selected) {
      this.selected.IPAddress.AddressingType = value
        ? AddressingType.Dynamic
        : AddressingType.Static;
    }
  }

  AddressingType = AddressingType;

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.load().then((x) => {
      this.datas = x;
      if (this.datas.length > 0) {
        this.selected = this.datas[0];
      }
    });
  }

  save() {
    if (this.selected) {
      this.business
        .update(this.selected)
        .then((x) => {
          this.toastr.success('操作成功');
          this.selected = x;
          let index = this.datas.findIndex((y) => y.Id == x.Id);
          if (index >= 0) {
            this.datas[index] = x;
          }
        })
        .catch((e) => {
          this.toastr.error('操作失败');
        })
        .finally(() => {
          this.window.confirm.show = false;
        });
    }
  }
}
