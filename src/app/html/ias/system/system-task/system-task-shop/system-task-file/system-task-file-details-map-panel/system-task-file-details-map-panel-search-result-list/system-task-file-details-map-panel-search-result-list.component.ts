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
import { AMapInputTipItem } from '../../../../../../../../common/helper/map/amap.model';
import { SystemTaskFileDetailsMapPanelSearchResultItemComponent } from '../system-task-file-details-map-panel-search-result-item/system-task-file-details-map-panel-search-result-item.component';
import { SystemTaskFileDetailsMapPanelSearchResultListBusiness } from './system-task-file-details-map-panel-search-result-list.business';
import { SystemTaskFileDetailsMapPanelSearchResultListArgs } from './system-task-file-details-map-panel-search-result-list.model';

@Component({
  selector: 'ias-system-task-file-details-map-panel-search-result-list',
  imports: [
    CommonModule,
    SystemTaskFileDetailsMapPanelSearchResultItemComponent,
  ],
  templateUrl:
    './system-task-file-details-map-panel-search-result-list.component.html',
  styleUrl:
    './system-task-file-details-map-panel-search-result-list.component.less',
  providers: [SystemTaskFileDetailsMapPanelSearchResultListBusiness],
})
export class SystemTaskFileDetailsMapPanelSearchResultListComponent
  implements OnInit, OnDestroy
{
  @Input() args = new SystemTaskFileDetailsMapPanelSearchResultListArgs();
  @Input('load')
  input_load?: EventEmitter<SystemTaskFileDetailsMapPanelSearchResultListArgs>;
  @Output() loaded = new EventEmitter<AMapInputTipItem[]>();
  @Output() itemover = new EventEmitter<AMapInputTipItem>();
  @Output() itemout = new EventEmitter<AMapInputTipItem>();
  @Output() itemclick = new EventEmitter<AMapInputTipItem>();
  @Output() copied = new EventEmitter<[number, number]>();

  constructor(
    private business: SystemTaskFileDetailsMapPanelSearchResultListBusiness
  ) {}
  selected?: AMapInputTipItem;
  datas: AMapInputTipItem[] = [];
  private subscription = new Subscription();
  ngOnInit(): void {
    if (this.input_load) {
      let sub = this.input_load.subscribe((x) => {
        this.args = x;
        this.load(this.args);
      });
      this.subscription.add(sub);
    }
    this.load(this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: SystemTaskFileDetailsMapPanelSearchResultListArgs) {
    this.business.load(args).then((x) => {
      this.datas = x;
      this.loaded.emit(this.datas);
    });
  }

  on = {
    copied: (data: [number, number]) => {
      this.copied.emit(data);
    },
    mouse: {
      over: (item: AMapInputTipItem) => {
        if (item.location) {
          this.itemover.emit(item);
        }
      },
      out: (item: AMapInputTipItem) => {
        if (item.location) {
          this.itemout.emit(item);
        }
      },
      click: (item: AMapInputTipItem) => {
        if (item.location) {
          this.selected = item;
          this.itemclick.emit(item);
        }
      },
    },
  };
}
