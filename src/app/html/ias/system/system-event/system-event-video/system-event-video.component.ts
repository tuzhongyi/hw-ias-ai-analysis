import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { VideoPathComponent } from '../../../share/video-path/component/video-path.component';
import { IVideoPathArgs } from '../../../share/video-path/component/video-path.model';
import { SystemEventVideoBusiness } from './business/system-event-video.business';

@Component({
  selector: 'ias-system-event-video',
  imports: [CommonModule, VideoPathComponent],
  templateUrl: './system-event-video.component.html',
  styleUrl: './system-event-video.component.less',
  providers: [SystemEventVideoBusiness],
})
export class SystemEventVideoComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  constructor(private business: SystemEventVideoBusiness) {}

  map?: IVideoPathArgs;
  path?: string;

  ngOnInit(): void {
    if (this.data) {
      this.path = this.business.file(this.data.Id);
      this.map = {
        business: this.business,
        args: {
          eventId: this.data.Id,
        },
      };
    }
  }
}
