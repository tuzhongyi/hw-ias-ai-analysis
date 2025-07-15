import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { InputSelectComponent } from '../../../../common/components/input-select/input-select.component';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { InputSelectTaskBusiness } from './input-select-task.business';

@Component({
  selector: 'ias-input-select-task',
  imports: [InputSelectComponent],
  templateUrl: './input-select-task.component.html',
  styleUrl: './input-select-task.component.less',
  providers: [InputSelectTaskBusiness],
})
export class InputSelectTaskComponent {
  @Input() tasks: AnalysisTask[] = [];
  @Output() tasksChange = new EventEmitter<AnalysisTask[]>();
  @Input() selected?: AnalysisTask;
  @Output() selectedChange = new EventEmitter<AnalysisTask>();

  constructor(private business: InputSelectTaskBusiness) {}

  name? = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.change.selected(changes['selected']);
  }

  private change = {
    selected: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.selected) {
          this.name = this.selected.Name;
          this.onselect(this.selected.Id);
        } else {
          this.name = '';
        }
      }
    },
  };

  oninput(name: string) {
    this.name = name;
    if (this.name) {
      this.business.by.name(name).then((x) => {
        this.tasks = x;
        this.tasksChange.emit(this.tasks);
      });
    } else {
      this.tasks = [];
      this.tasksChange.emit(this.tasks);
    }
  }
  onselect(id: string) {
    let item = this.tasks.find((x) => x.Id == id);
    if (item) {
      this.tasksChange.emit([item]);
      this.selectedChange.emit(item);
    }
  }
  onfocus() {
    if (!this.name) {
      this.business.all().then((x) => {
        this.tasks = x;
        this.tasksChange.emit(this.tasks);
      });
    }
  }
}
