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
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { PatrolSection } from '../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { SystemModulePatrolSectionMapArgs } from '../system-module-patrol-section.model';
import { SystemModulePatrolSectionMapController } from './controller/system-module-patrol-section-map.controller';
import { SystemModulePatrolSectionMapBusiness } from './system-module-patrol-section-map.business';

@Component({
  selector: 'ias-system-module-patrol-section-map',
  imports: [CommonModule],
  templateUrl: './system-module-patrol-section-map.component.html',
  styleUrl: './system-module-patrol-section-map.component.less',
  providers: [SystemModulePatrolSectionMapBusiness],
})
export class SystemModulePatrolSectionMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input('load') _load?: EventEmitter<SystemModulePatrolSectionMapArgs>;
  @Input() sections: PatrolSection[] = [];
  @Input() sectionlabelable: boolean = false;
  @Input() sectionselected?: PatrolSection;
  @Input() sectionhover?: PatrolSection;
  @Input() rectified = false;
  @Output('loaded') _loaded = new EventEmitter<FileGpsItem[]>();
  @Output() sectionpickup = new EventEmitter<[number, number][]>();
  @Output() sectioncancel = new EventEmitter<void>();

  constructor(private business: SystemModulePatrolSectionMapBusiness) {
    this.controller = new SystemModulePatrolSectionMapController(
      this.subscription,
    );
  }

  private args?: SystemModulePatrolSectionMapArgs;
  private subscription = new Subscription();
  private controller: SystemModulePatrolSectionMapController;

  private load = {
    section: (datas: PatrolSection[]) => {
      this.controller.section.load(datas).then((x) => {
        this.applyLabelState();
        this.controller.map.focus(x, true);
      });
    },
    gps: (args: SystemModulePatrolSectionMapArgs, rectified: boolean) => {
      this.args = args;
      let datas: FileGpsItem[] = [];
      this.controller.path.clear();
      if (args.deviceId) {
        this.business
          .load(args.deviceId, args.duration, args.precision, rectified)
          .then((items) => {
            this.controller.path.load(items).then((polylines) => {
              this.controller.map.focus(polylines);
            });
            for (let i = 0; i < items.length; i++) {
              datas = [...datas, ...items[i]];
            }
          })
          .finally(() => {
            this._loaded.emit(datas);
          });
      }
    },
  };

  private change = {
    rectified: (simple: SimpleChange) => {
      if (simple) {
        if (this.args) {
          this.load.gps(this.args, this.rectified);
        }
      }
    },
    sections: (simple: SimpleChange) => {
      if (simple) {
        console.log(this.sections);
        this.load.section(this.sections);
      }
    },
    sectionselected: (simple: SimpleChange) => {
      if (simple) {
        if (this.sectionselected) {
          this.controller.section.select(this.sectionselected.Id);
        } else {
          this.controller.section.blur();
        }
      }
    },
    sectionlabelable: (simple: SimpleChange) => {
      if (simple) {
        this.applyLabelState();
      }
    },
    sectionhover: (simple: SimpleChange) => {
      if (simple) {
        if (this.sectionhover) {
          this.controller.section.hover(this.sectionhover.Id);
        } else {
          this.controller.section.blurHover();
        }
      }
    },
  };

  private applyLabelState() {
    if (this.sectionlabelable) {
      this.controller.section.label.show();
    } else {
      this.controller.section.label.hide();
    }
  }

  ngOnInit(): void {
    this.regist.all();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.rectified(changes['rectified']);
    this.change.sections(changes['sections']);
    this.change.sectionselected(changes['sectionselected']);
    this.change.sectionlabelable(changes['sectionlabelable']);
    this.change.sectionhover(changes['sectionhover']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }

  private regist = {
    all: () => {
      this.regist.input();
      this.regist.output();
    },
    input: () => {
      if (this._load) {
        let sub = this._load.subscribe((x) => {
          // 新数据加载前清理 selection
          this.controller.selection.clear();
          this.load.gps(x, this.rectified);
        });
        this.subscription.add(sub);
      }
    },
    output: () => {
      // path click → selection
      this.subscription.add(
        this.controller.event.path.click.subscribe(async (x) => {
          let both = await this.controller.selection.set(
            x,
            this.business.datas,
          );
          if (both) {
            this.controller.selection.load(this.business.datas);
          }
        }),
      );
      // selection completed → output
      this.subscription.add(
        this.controller.event.selection.completed.subscribe((seg) => {
          this.sectionpickup.emit(seg);
        }),
      );
      this.subscription.add(
        this.controller.event.selection.cancel.subscribe((seg) => {
          this.sectioncancel.emit(seg);
        }),
      );
    },
  };
}
