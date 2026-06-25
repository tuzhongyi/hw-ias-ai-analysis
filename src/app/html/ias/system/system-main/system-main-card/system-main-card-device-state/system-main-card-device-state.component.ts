import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { PathTool } from '../../../../../../common/tools/path-tool/path.tool';
import { SystemMainCardContainerComponent } from '../system-main-card-container/system-main-card-container.component';
import { SystemMainCardDeviceStateBusiness } from './system-main-card-device-state.business';

@Component({
  selector: 'ias-system-main-card-device-state',
  imports: [CommonModule, SystemMainCardContainerComponent],
  templateUrl: './system-main-card-device-state.component.html',
  styleUrl: './system-main-card-device-state.component.less',
  providers: [SystemMainCardDeviceStateBusiness],
})
export class SystemMainCardDeviceStateComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;
  title: string;

  constructor(
    private business: SystemMainCardDeviceStateBusiness,
    public language: LanguageTool,
    private path: PathTool,
  ) {
    this.title = `${this.language.device.Name}状态`;
  }

  get background() {
    return `url(${this.path.image.card.get().state})`;
  }

  value = {
    count: 3,
    online: 2,
    offline: 1,
  };
  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  private regist() {
    if (this._load) {
      this.subscription.add(
        this._load.subscribe(() => {
          this.load();
        }),
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load() {
    this.business.load().then((datas) => {
      this.value.count = datas.length;
      this.value.online = 0;
      this.value.offline = 0;
      datas.forEach((x) => {
        if (x.OnlineStatus === 0) {
          this.value.online++;
        } else {
          this.value.offline++;
        }
      });
    });
  }
}
