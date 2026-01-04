import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemModuleRoadTableArgs } from '../../system-module-road/system-module-road-table/system-module-road-table.model';
import { SystemModuleMobileDeviceTableBusiness } from './system-module-mobile-device-table.business';

@Component({
  selector: 'ias-system-module-mobile-device-table',
  imports: [CommonModule],
  templateUrl: './system-module-mobile-device-table.component.html',
  styleUrl: './system-module-mobile-device-table.component.less',
  providers: [SystemModuleMobileDeviceTableBusiness],
})
export class SystemModuleMobileDeviceTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() operable = true;
  @Input() args = new SystemModuleRoadTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleRoadTableArgs>;
  @Output() modify = new EventEmitter<MobileDevice>();
  @Output() delete = new EventEmitter<MobileDevice>();
  @Output() error = new EventEmitter<Error>();
  @Output() loaded = new EventEmitter<MobileDevice[]>();
  @Input() selected?: MobileDevice;
  @Output() selectedChange = new EventEmitter<MobileDevice>();

  constructor(private business: SystemModuleMobileDeviceTableBusiness) {}

  datas: MobileDevice[] = [];
  widths = ['65px', 'auto', '200px', '200px', '100px', '100px'];
  Language = Language;

  private subscription = new Subscription();

  private change = {
    operable: (simple: SimpleChange) => {
      if (simple) {
        if (!this.operable) {
          this.widths = ['65px', 'auto', '200px', '200px', '100px', '0px'];
        }
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.operable(changes['operable']);
  }

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(this.args);
      });
      this.subscription.add(sub);
    }
    this.load(this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: SystemModuleRoadTableArgs) {
    this.business
      .load(args)
      .then((x) => {
        this.datas = x;
        this.loaded.emit(x);
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  onselect(item: MobileDevice) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
    this.selectedChange.emit(this.selected);
  }

  onmodify(item: MobileDevice, e: Event) {
    this.modify.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  ondelete(item: MobileDevice, e: Event) {
    this.delete.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
