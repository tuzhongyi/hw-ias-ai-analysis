import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ContentHeaderComponent } from '../../header/content-header/content-header.component';
import { VideoWindowContentBusiness } from './video-window-content.business';

@Component({
  selector: 'ias-video-window-content',
  imports: [ContentHeaderComponent],
  templateUrl: './video-window-content.component.html',
  styleUrl: './video-window-content.component.less',
  providers: [VideoWindowContentBusiness],
})
export class VideoWindowContentComponent implements OnInit {
  @Input() filename?: string;
  constructor(
    private business: VideoWindowContentBusiness,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  src?: SafeResourceUrl;

  ngOnInit(): void {
    if (this.filename) {
      this.load(this.filename);
    }
  }

  private load(filename: string) {
    this.business
      .path(filename)
      .then((url) => {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      })
      .catch((e) => {
        this.toastr.error('加载失败');
      });
  }

  onerror(e: Event) {
    if (!this.filename) return;
    let target = e.currentTarget as HTMLVideoElement;
    let error = target.error;
    if (error) {
      let message = '视频加载失败';
      this.toastr.error(message);
    }
  }
}
