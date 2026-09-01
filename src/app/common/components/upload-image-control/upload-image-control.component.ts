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
import { NameValue } from '../../data-core/models/capabilities/enum-name-value.model';
import { PagedList } from '../../data-core/models/interface/page-list.model';
import { ImageControlComponent } from '../image-control/image-control.component';
import { UploadControlComponent } from '../upload-control/upload-control.component';
import { UploadControlFile } from '../upload-control/upload-control.model';

@Component({
  selector: 'ias-upload-image-control',
  imports: [CommonModule, UploadControlComponent, ImageControlComponent],
  templateUrl: './upload-image-control.component.html',
  styleUrl: './upload-image-control.component.less',
})
export class UploadImageControlComponent implements OnInit, OnDestroy {
  @Input() disabled = false;
  @Output() preview = new EventEmitter<PagedList<NameValue<string>>>();
  @Input() get?: EventEmitter<(files: UploadControlFile[]) => void>;

  cache: UploadControlFile[] = [];
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.get) {
      this.subscription.add(
        this.get.subscribe((x) => {
          x(this.cache);
        }),
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onupload(data: UploadControlFile) {
    this.cache.push(data);
  }
}
