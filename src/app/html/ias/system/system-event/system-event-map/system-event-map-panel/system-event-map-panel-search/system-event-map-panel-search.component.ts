import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../../common/components/date-time-control/date-time-control.component';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { SystemEventMapArgs } from '../../system-event-map-manager/system-event-map-manager.model';

@Component({
  selector: 'ias-system-event-map-panel-search',
  imports: [CommonModule, FormsModule, DateTimeControlComponent],
  templateUrl: './system-event-map-panel-search.component.html',
  styleUrl: './system-event-map-panel-search.component.less',
})
export class SystemEventMapPanelSearchComponent implements OnInit {
  @Input() args?: SystemEventMapArgs;
  @Output() search = new EventEmitter<SystemEventMapArgs>();

  constructor(private language: LanguageTool) {}

  type = {
    names: new Map<number, string>(),
  };

  ngOnInit(): void {
    if (this.args) {
      this.init(this.args);
    }
  }

  private async init(args: SystemEventMapArgs) {
    this.type.names = new Map<number, string>();
    for (let i = 0; i < args.types.length; i++) {
      const type = args.types[i];
      let name = await this.language.event.EventType(type);
      this.type.names.set(type, name);
    }
  }

  on = {
    search: () => {
      if (this.args) {
        this.search.emit(this.args);
      }
    },
  };
}
