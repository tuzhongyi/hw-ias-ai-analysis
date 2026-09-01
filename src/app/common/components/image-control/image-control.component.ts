import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NameValue } from '../../data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  PagedList,
} from '../../data-core/models/interface/page-list.model';
import { UploadControlFile } from '../upload-control/upload-control.model';

@Component({
  selector: 'ias-image-control',
  imports: [CommonModule],
  templateUrl: './image-control.component.html',
  styleUrl: './image-control.component.less',
})
export class ImageControlComponent {
  @Input() images: string[] = [];
  @Input() files: UploadControlFile[] = [];
  @Input() disabled = false;
  @Output() preview = new EventEmitter<PagedList<NameValue<string>>>();

  private urls = new WeakMap<UploadControlFile, string>();

  url(file: UploadControlFile): string {
    let url = this.urls.get(file);
    if (!url) {
      url = this.convert(file.data as ArrayBuffer);
      this.urls.set(file, url);
    }
    return url;
  }

  ondeletefile(index: number, e: Event) {
    e.stopPropagation();
    this.files.splice(index, 1);
  }

  onpreview(index: number, e: Event) {
    e.stopPropagation();
    let datas = [
      ...this.images.map((url) => new NameValue<string>(url)),
      ...this.files.map(
        (file) => new NameValue<string>(this.url(file), file.filename),
      ),
    ];
    let paged = new PagedList<NameValue<string>>();
    paged.Data = datas;
    paged.Page = Page.create(index + 1, 1, datas.length);
    this.preview.emit(paged);
  }

  private convert(data: ArrayBuffer): string {
    var binary = '';
    var bytes = new Uint8Array(data);
    for (var i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/png;base64,${window.btoa(binary)}`;
  }
}
