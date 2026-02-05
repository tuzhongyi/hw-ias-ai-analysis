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
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { UploadControlComponent } from '../../../../../../../common/components/upload-control/upload-control.component';
import { UploadControlFile } from '../../../../../../../common/components/upload-control/upload-control.model';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { SystemModuleRoadObjectDetailsImageBusiness } from './system-module-road-object-details-image.business';

@Component({
  selector: 'ias-system-module-road-object-details-image',
  imports: [
    CommonModule,
    FormsModule,
    UploadControlComponent,
    PictureComponent,
    ContainerZoomComponent,
  ],
  templateUrl: './system-module-road-object-details-image.component.html',
  styleUrl: './system-module-road-object-details-image.component.less',
  providers: [SystemModuleRoadObjectDetailsImageBusiness],
})
export class SystemModuleRoadObjectDetailsImageComponent
  implements OnInit, OnDestroy
{
  @Input() url?: string;
  @Input() load?: EventEmitter<string>;
  @Output() upload = new EventEmitter<ArrayBuffer>();
  @Output() picture = new EventEmitter<string>();

  constructor(private business: SystemModuleRoadObjectDetailsImageBusiness) {}

  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.url) {
      this.image.src = this.business.get(this.url);
    }
    this.regist();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this.load) {
      const sub = this.load.subscribe((url) => {
        this.image.src = url;
      });
      this.subscription.add(sub);
    }
  }

  image = {
    src: '',
    upload: (data: UploadControlFile) => {
      this.image.src = this.business.convert(data.data as ArrayBuffer);
      this.upload.emit(data.data as ArrayBuffer);
    },
    full: () => {
      if (this.url) {
        this.picture.emit(this.url);
      }
    },
  };
}
