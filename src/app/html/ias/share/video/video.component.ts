import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { VideoBusiness } from './video.business';

@Component({
  selector: 'ias-video',
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.less',
  providers: [VideoBusiness],
})
export class VideoComponent {
  @Input() path?: string;
  @Input() filename?: string;
  constructor(
    private business: VideoBusiness,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  src?: SafeResourceUrl;

  ngOnInit(): void {
    if (this.path) {
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
    } else if (this.filename) {
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
      console.error(target.src, error);
      this.toastr.error(error.message, message);
    }
  }
}
