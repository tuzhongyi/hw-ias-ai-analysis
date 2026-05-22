import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { InputSelectComponent } from '../../../../common/components/input-select/input-select.component';
import { Department } from '../../../../common/data-core/models/arm/security/department.model';
import { LocaleCompare } from '../../../../common/tools/compare-tool/compare.tool';
import { InputSelectDepartmentBusiness } from './input-select-department.business';

@Component({
  selector: 'ias-input-select-department',
  imports: [InputSelectComponent],
  templateUrl: './input-select-department.component.html',
  styleUrl: './input-select-department.component.less',
  providers: [InputSelectDepartmentBusiness],
})
export class InputSelectDepartmentComponent implements OnChanges {
  @Input() auto = false;
  @Input() departments: Department[] = [];
  @Output() departmentsChange = new EventEmitter<Department[]>();
  @Input() selected?: Department;
  @Output() selectedChange = new EventEmitter<Department>();
  @Input() clear = false;
  @Output() clearChange = new EventEmitter<boolean>();

  constructor(private business: InputSelectDepartmentBusiness) {}

  name = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.change.selected(changes['selected']);
    this.change.clear(changes['clear']);
  }

  private change = {
    selected: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.selected) {
          this.name = this.selected.Name;
          this.onselect(this.selected.Id);
        } else {
          // this.name = '';
        }
      }
    },
    clear: (simple: SimpleChange) => {
      if (simple) {
        if (this.clear) {
          this.name = '';
          Promise.resolve().then(() => {
            this.clear = false;
            this.clearChange.emit(this.clear);
          });
        }
      }
    },
  };

  oninput(name: string) {
    this.name = name;
    if (this.name) {
      this.business.by.name(name).then((x) => {
        this.departments = x;
        this.departments = this.departments.sort((a, b) => {
          return LocaleCompare.compare(a.Name, b.Name);
        });
        this.departmentsChange.emit(this.departments);
      });
    } else {
      this.departments = [];
      this.departmentsChange.emit(this.departments);
    }
    this.selected = undefined;
    this.selectedChange.emit(this.selected);
  }
  onselect(id: string) {
    let item = this.departments.find((x) => x.Id == id);
    if (item) {
      this.departmentsChange.emit([item]);
      this.selectedChange.emit(item);
    }
  }
  onfocus() {
    if (this.auto) {
      if (this.selected) {
        this.departments = [this.selected];
        this.departmentsChange.emit(this.departments);
      } else if (this.name) {
        this.oninput(this.name);
      } else {
        this.business.all().then((x) => {
          this.departments = x;
          this.departments = this.departments.sort((a, b) => {
            return LocaleCompare.compare(a.Name, b.Name);
          });
          this.departmentsChange.emit(this.departments);
        });
      }
    }
  }
}
