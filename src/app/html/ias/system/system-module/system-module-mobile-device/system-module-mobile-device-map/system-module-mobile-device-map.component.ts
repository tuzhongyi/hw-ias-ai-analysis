import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { SystemModuleMobileDeviceMapController } from './controller/system-module-mobile-device-map.controller';

@Component({
  selector: 'ias-system-module-mobile-device-map',
  imports: [],
  templateUrl: './system-module-mobile-device-map.component.html',
  styleUrl: './system-module-mobile-device-map.component.less',
})
export class SystemModuleMobileDeviceMapComponent implements OnChanges {
  @Input() datas: MobileDevice[] = [];

  controller = new SystemModuleMobileDeviceMapController(
    'system-module-mobile-device-map'
  );

  constructor() {}

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        this.controller.amap.clear().then((x) => {
          if (this.datas.length > 0) {
            this.controller.amap.load(this.datas).then((x) => {
              this.controller.amap.focus();
            });
          }
        });
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
  }
}
