import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { OptionMode } from '../../../../../../../common/data-core/enums/option.enum';
import { AutomaticAssignmentRule } from '../../../../../../../common/data-core/models/arm/security/automatic-assignment-rule.model';
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/interface/model.interface';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemModuleSecurityDepartmentSource } from '../system-module-security-department.source';

@Component({
  selector: 'ias-system-module-security-department-details-info',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    HowellSelectComponent,
  ],
  templateUrl:
    './system-module-security-department-details-info.component.html',
  styleUrl: './system-module-security-department-details-info.component.less',
  providers: [SystemModuleSecurityDepartmentSource],
})
export class SystemModuleSecurityDepartmentDetailsInfoComponent {
  @Input() data!: Department;
  @Input() option = OptionMode.create;

  constructor(public source: SystemModuleSecurityDepartmentSource) {}

  OptionMode = OptionMode;
  Language = Language;

  ngOnInit(): void {
    this.init.all();
    if (this.data.AssignmentRule) {
      this.selection.event.load(this.data.AssignmentRule.EventTypes);
    }
  }

  private init = {
    all: () => {
      this.init.events();
      this.init.division();
      this.init.gridcell();
    },
    data: () => {
      let data = new Department();
      data.DepartmentType = 1;
      data.AssignmentRule = new AutomaticAssignmentRule();
      data.AssignmentRule.Enabled = true;
      data.AssignmentRule.EventTypes = [];
      return data;
    },
    events: () => {
      wait(() => {
        return this.source.events.length > 0;
      }).then((x) => {
        this.selection.event.datas = this.source.events.map((x) => {
          let item: IIdNameModel<number> = {
            Id: x.Value,
            Name: x.Name,
          };
          return item;
        });
      });
    },
    division: () => {
      wait(() => {
        return this.source.divisions.length > 0;
      }).then((x) => {
        if (this.source.divisions.length == 1) {
          if (!this.data.DivisionId) {
            this.data.DivisionId = this.source.divisions[0].Id;
          }
        }
      });
    },
    gridcell: () => {
      wait(() => {
        return this.source.gridcells.length > 0;
      }).then((x) => {
        if (this.source.gridcells.length == 1) {
          this.data.GridCellId = this.source.gridcells[0].Id;
        }
      });
    },
  };

  selection = {
    event: {
      datas: [] as IIdNameModel<number>[],
      selected: [] as number[],
      change: (id: number) => {
        let has = this.selection.event.selected.includes(id);
        if (has) {
          this.selection.event.selected = this.selection.event.selected.filter(
            (x) => x != id,
          );
        } else {
          this.selection.event.selected.push(id);
        }
        this.selection.event.selected = this.selection.event.selected.sort(
          (a, b) => a - b,
        );
        if (this.data.AssignmentRule) {
          this.data.AssignmentRule.EventTypes = [
            ...this.selection.event.selected,
          ];
        }
      },
      load: async (values: number[]) => {
        await wait(() => {
          return this.source.events.length > 0;
        });
        this.selection.event.selected = this.selection.event.datas
          .filter((x) => values.includes(x.Id))
          .map((x) => x.Id);
      },
    },
  };
}
