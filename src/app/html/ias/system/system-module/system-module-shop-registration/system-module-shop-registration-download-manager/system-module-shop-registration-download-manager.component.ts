import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { SystemModuleShopRegistrationDownloadManagerBusiness } from './system-module-shop-registration-download-manager.business';

@Component({
  selector: 'ias-system-module-shop-registration-download-manager',
  imports: [CommonModule, FormsModule, HowellSelectComponent],
  templateUrl:
    './system-module-shop-registration-download-manager.component.html',
  styleUrl: './system-module-shop-registration-download-manager.component.less',
  providers: [SystemModuleShopRegistrationDownloadManagerBusiness],
})
export class SystemModuleShopRegistrationDownloadManagerComponent
  implements OnInit
{
  @Output() close = new EventEmitter<void>();
  constructor(
    private business: SystemModuleShopRegistrationDownloadManagerBusiness,
    private toastr: ToastrService
  ) {}

  road = {
    datas: [] as Road[],
    selected: undefined as Road | undefined,
  };

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.load().then((x) => {
      this.road.datas = x.sort((a, b) => {
        return LocaleCompare.compare(a.Name, b.Name);
      });
    });
  }

  on = {
    download: () => {
      if (!this.road.selected) {
        this.toastr.warning('请选择所在道路');
        return;
      }

      this.business.download(this.road.selected);
    },
    close: () => {
      this.close.emit();
    },
  };
}
