import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { VideoPathMapAMapController } from './controller/video-path-map-amap.controller';
import { VideoPathMapController } from './controller/video-path-map.controller';
import { IVideoPathMapBusiness } from './video-path-map.model';

@Component({
  selector: 'howell-video-path-map',
  imports: [CommonModule],
  templateUrl: './video-path-map.component.html',
  styleUrl: './video-path-map.component.less',
  providers: [VideoPathMapAMapController, VideoPathMapController],
})
export class VideoPathMapComponent implements OnInit, OnDestroy {
  @Input() business?: IVideoPathMapBusiness;
  @Input() args: any;
  @Input('to') _to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<void>();
  @Output() error = new EventEmitter<Error>();

  constructor(private controller: VideoPathMapController) {}

  loading = false;
  hasdata = false;
  speed = 0;

  ngOnInit(): void {
    if (this._to) {
      this._to.subscribe((x) => {
        this.controller.to(x);
      });
    }
    this.controller.trigger.subscribe((x) => {
      this.trigger.emit(x);
    });
    this.controller.speed.subscribe((x) => {
      this.speed = x ?? 0;
    });

    if (this.args && this.business) {
      this.load(this.business, this.args);
    }
  }
  async load(business: IVideoPathMapBusiness, args: any) {
    try {
      this.loading = true;
      this.hasdata = false;
      let datas = await business.load(args);
      this.hasdata = datas.length > 0;
      this.loaded.emit();
      if (this.hasdata) {
        await this.controller.load(datas);
      }
    } catch (e: any) {
      this.error.emit(e);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.controller.destroy();
  }
}
