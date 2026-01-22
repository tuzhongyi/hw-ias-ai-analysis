import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
export class SystemModuleRoadObjectDetailsImageComponent implements OnInit {
  @Input() url?: string;
  @Output() upload = new EventEmitter<ArrayBuffer>();
  @Output() picture = new EventEmitter<string>();

  constructor(private business: SystemModuleRoadObjectDetailsImageBusiness) {}

  ngOnInit(): void {
    if (this.url) {
      this.image.src = this.business.get(this.url);
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
