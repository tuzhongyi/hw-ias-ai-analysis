import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemModuleGpsTaskVideoUploadBusiness } from './system-module-gps-task-video-upload.business';

@Component({
  selector: 'ias-system-module-gps-task-video-upload',
  imports: [FormsModule],
  templateUrl: './system-module-gps-task-video-upload.component.html',
  styleUrl: './system-module-gps-task-video-upload.component.less',
  providers: [SystemModuleGpsTaskVideoUploadBusiness],
})
export class SystemModuleGpsTaskVideoUploadComponent
  implements OnChanges, OnInit
{
  @Input() filename = '';
  @Input() data?: ArrayBuffer;
  @Output() complete = new EventEmitter<FileInfo>();

  constructor(private business: SystemModuleGpsTaskVideoUploadBusiness) {}

  progress = 0;

  private change = {
    data: (simple: SimpleChange) => {
      if (simple) {
        if ((this.filename, this.data)) {
          this.upload(this.filename, this.data);
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    // this.change.data(changes['data']);
  }
  ngOnInit(): void {
    wait(() => {
      return !!(this.filename && this.data);
    }).then(() => {
      if (this.filename && this.data) {
        this.upload(this.filename, this.data);
      }
    });
  }

  private upload(filename: string, data: ArrayBuffer) {
    this.business
      .upload(filename, data, (value: number) => {
        this.progress = value;
      })
      .then((x) => {
        this.complete.emit(x);
      });
  }
}
