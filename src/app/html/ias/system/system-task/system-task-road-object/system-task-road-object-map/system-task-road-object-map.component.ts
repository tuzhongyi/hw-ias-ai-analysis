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
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { SystemTaskRoadObjectMapController } from './controller/system-task-road-object-map.controller';

@Component({
  selector: 'ias-system-task-road-object-map',
  imports: [CommonModule],
  templateUrl: './system-task-road-object-map.component.html',
  styleUrl: './system-task-road-object-map.component.less',
  providers: [ComponentTool],
})
export class SystemTaskRoadObjectMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() objects: RoadObject[] = [];
  @Input() objectable = true;
  @Input() object_selected?: RoadObject;
  @Output() object_selectedChange = new EventEmitter<RoadObject>();
  @Input() object_loaded = false;
  @Output() object_loadedChange = new EventEmitter<boolean>();
  @Output() object_dblclick = new EventEmitter<RoadObject>();

  @Input() sections: RoadSection[] = [];
  @Input() sectionable = true;
  @Input() section_selected?: RoadSection;
  @Output() section_selectedChange = new EventEmitter<RoadSection>();
  @Input() section_loaded = false;
  @Output() section_loadedChange = new EventEmitter<boolean>();
  @Output() section_dblclick = new EventEmitter<RoadSection>();

  @Input() points: RoadPoint[] = [];
  @Input() pointable = true;
  @Input() point_selected?: RoadPoint;
  @Output() point_selectedChange = new EventEmitter<RoadPoint>();
  @Input() point_loaded = false;
  @Output() point_loadedChange = new EventEmitter<boolean>();
  @Output() point_dblclick = new EventEmitter<RoadPoint>();

  @Input() focus = false;
  @Output() focusChange = new EventEmitter<boolean>();

  @Input() itemover?: EventEmitter<RoadObject | RoadPoint | RoadSection>;
  @Input() itemleave?: EventEmitter<RoadObject | RoadPoint | RoadSection>;

  constructor(tool: ComponentTool) {
    this.controller = new SystemTaskRoadObjectMapController(
      tool,
      this.subscription
    );
  }

  private subscription = new Subscription();
  private controller: SystemTaskRoadObjectMapController;
  private load = {
    object: async (clear = false) => {
      try {
        if (clear) {
          await this.controller.road.object.clear();
        }
        if (this.objects.length > 0 && this.objectable) {
          return this.controller.road.object.load(this.objects);
        }
        return [];
      } finally {
        setTimeout(() => {
          this.object_loaded = true;
          this.object_loadedChange.emit(this.object_loaded);
        }, 0);
      }
    },
    section: async (clear = false) => {
      try {
        if (clear) {
          await this.controller.road.section.clear();
        }
        if (this.sections.length > 0 && this.sectionable) {
          await this.controller.road.section.load(this.sections);
        }
      } finally {
        setTimeout(() => {
          this.section_loaded = true;
          this.section_loadedChange.emit(this.section_loaded);
        }, 0);
      }
    },
    point: async (clear = false) => {
      try {
        if (clear) {
          await this.controller.road.point.clear();
        }
        if (this.points.length > 0 && this.pointable) {
          await this.controller.road.point.load(this.points);
        }
      } finally {
        setTimeout(() => {
          this.point_loaded = true;
          this.point_loadedChange.emit(this.point_loaded);
        }, 0);
      }
    },
  };

  private change = {
    object: {
      datas: (simple: SimpleChange) => {
        if (simple) {
          this.load.object(!simple.firstChange);
        }
      },
      selected: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          if (this.object_selected) {
            this.controller.road.object.select(this.object_selected);
          }
        }
      },
      enable: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          this.load.object(true);
        }
      },
    },
    section: {
      datas: (simple: SimpleChange) => {
        if (simple) {
          this.load.section(!simple.firstChange);
        }
      },
      selected: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          console.log('change section selected', this.section_selected);
        }
      },
      enable: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          this.load.section(true);
        }
      },
    },
    point: {
      datas: (simple: SimpleChange) => {
        if (simple) {
          this.load.point(!simple.firstChange);
        }
      },
      selected: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          console.log('change point selected', this.point_selected);
        }
      },
      enable: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          this.load.point(true);
        }
      },
    },
    focus: (simple: SimpleChange) => {
      if (simple) {
        if (this.focus) {
          setTimeout(() => {
            this.controller.map.focus();
            this.focus = false;
            this.focusChange.emit(this.focus);
          }, 0);
        }
      }
    },
  };
  ngOnInit(): void {
    this.regist.input();
    this.regist.output();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.object.datas(changes['objects']);
    this.change.object.selected(changes['object_selected']);
    this.change.object.enable(changes['objectable']);
    this.change.point.datas(changes['points']);
    this.change.point.selected(changes['point_selected']);
    this.change.point.enable(changes['pointable']);
    this.change.section.datas(changes['sections']);
    this.change.section.selected(changes['section_selected']);
    this.change.section.enable(changes['sectionable']);
    this.change.focus(changes['focus']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }

  private regist = {
    input: () => {
      if (this.itemover) {
        let sub_itemover = this.itemover.subscribe((x) => {
          if (x instanceof RoadObject) {
            this.controller.road.object.hover(x);
          }
        });
        this.subscription.add(sub_itemover);
      }
      if (this.itemleave) {
        let sub_itemleave = this.itemleave.subscribe((x) => {
          if (x instanceof RoadObject) {
            this.controller.road.object.leave(x);
          }
        });
        this.subscription.add(sub_itemleave);
      }
    },
    output: () => {
      let sub_object_click = this.controller.road.event.click.subscribe(
        (data) => {
          this.object_selected = data;
          this.object_selectedChange.emit(this.object_selected);
        }
      );
      this.subscription.add(sub_object_click);

      let sub_object_dblclick = this.controller.road.event.dblclick.subscribe(
        (data) => {
          this.object_dblclick.emit(data);
        }
      );
      this.subscription.add(sub_object_dblclick);
    },
  };
}
