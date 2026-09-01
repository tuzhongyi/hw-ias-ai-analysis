import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UploadControlFile } from '../../../../../../common/components/upload-control/upload-control.model';
import { UploadImageControlComponent } from '../../../../../../common/components/upload-image-control/upload-image-control.component';
import { NameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { PagedList } from '../../../../../../common/data-core/models/interface/page-list.model';
import { SystemEventHandleParams } from '../../../../../../common/data-core/requests/services/system/event/handle/system-event-handle.params';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { SystemEventProcessHandlingBusiness } from './system-event-process-handling.business';

@Component({
  selector: 'ias-system-event-process-handling',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    UploadImageControlComponent,
  ],
  templateUrl: './system-event-process-handling.component.html',
  styleUrl: './system-event-process-handling.component.less',
  providers: [SystemEventProcessHandlingBusiness],
})
export class SystemEventProcessHandlingComponent implements OnInit, OnDestroy {
  @Input() disabled = false;
  @Input() misinfo = false;
  @Input() params = new SystemEventHandleParams();
  @Output() paramsChange = new EventEmitter<SystemEventHandleParams>();
  @Output() picture = new EventEmitter<PagedList<NameValue>>();
  @Input() pictureget?: EventEmitter<(files: UploadControlFile[]) => void>;

  private subscription = new Subscription();

  constructor(private business: SystemEventProcessHandlingBusiness) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  on = {
    change: () => {
      this.paramsChange.emit(this.params);
    },
    picture: {
      preview: (paged: PagedList<NameValue>) => {
        this.picture.emit(paged);
      },
    },
  };
}
