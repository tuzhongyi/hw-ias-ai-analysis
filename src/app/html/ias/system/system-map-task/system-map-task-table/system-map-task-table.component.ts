import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AnalysisTask } from '../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { SystemMapTaskTableBusiness } from './system-map-task-table.business';
import { SystemMapTaskTableArgs } from './system-map-task-table.model';

@Component({
  selector: 'ias-system-map-task-table',
  imports: [CommonModule],
  templateUrl: './system-map-task-table.component.html',
  styleUrl: './system-map-task-table.component.less',
  providers: [SystemMapTaskTableBusiness],
})
export class SystemMapTaskTableComponent
  implements OnInit, OnChanges, AfterViewChecked
{
  @Input() args = new SystemMapTaskTableArgs();
  @Input('load') _load?: EventEmitter<SystemMapTaskTableArgs>;
  @Input('selecteds') selectedIds: string[] = [];
  @Output() selectedsChange = new EventEmitter<string[]>();
  @Output() position = new EventEmitter<AnalysisTask>();

  constructor(
    private business: SystemMapTaskTableBusiness,
    private detector: ChangeDetectorRef,
    private manager: Manager
  ) {}

  @ViewChild('body') body?: ElementRef<HTMLElement>;
  datas: AnalysisTask[] = [];
  widths = ['70px', '70px', 'auto', '100px'];
  itemheight = 0;
  language = {
    types: new Map<number, string>(),
  };
  inited = new PromiseValue<boolean>();
  selecteds: AnalysisTask[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.change.selecteds(changes['selectedIds']);
  }

  ngOnInit(): void {
    this.init();
    this.load(this.args);

    if (this._load) {
      this._load.subscribe((x) => {
        this.args = x;
        this.load(this.args);
      });
    }
  }

  ngAfterViewChecked(): void {
    if (this.body && this.itemheight === 0) {
      let height = this.body.nativeElement.clientHeight;
      if (height) {
        height -= 80;
        this.itemheight = height * 0.1;
        this.detector.detectChanges();
      }
    }
  }

  change = {
    selecteds: (data: SimpleChange) => {
      if (data) {
        this.selecteds = this.selectedIds.map((x) => {
          return this.datas.find((y) => y.Id === x)!;
        });
      }
    },
  };

  private async init() {
    let types = await this.manager.source.server.TaskTypes;
    types.forEach((x) => {
      this.language.types.set(x.Value, x.Name);
    });
    this.inited.set(true);
  }

  private load(args: SystemMapTaskTableArgs) {
    this.inited.get().then((inited) => {
      if (inited) {
        this.business.load(args).then((x) => {
          this.datas = x;
        });
      }
    });
  }

  onselect(item: AnalysisTask) {
    if (this.selecteds.includes(item)) {
      this.selecteds = this.selecteds.filter((x) => x.Id !== item.Id);
    } else if (this.selecteds.length < 2) {
      this.selecteds.push(item);
    } else {
      this.selecteds.shift();
      this.selecteds.push(item);
    }
    this.selectedIds = this.selecteds.map((x) => x.Id);
    this.selectedsChange.emit(this.selectedIds);
  }
}
