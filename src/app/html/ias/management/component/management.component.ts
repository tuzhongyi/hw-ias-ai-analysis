import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorage } from '../../../../common/storage/local.storage';

@Component({
  selector: 'ias-management',
  imports: [],
  templateUrl: './management.component.html',
  styleUrl: './management.component.less',
})
export class ManagementComponent implements OnInit {
  constructor(private local: LocalStorage, private sanitizer: DomSanitizer) {}

  src?: SafeResourceUrl;

  ngOnInit(): void {
    let url = 'http://192.168.18.147/main/main.html';
    let auth = this.local.auth.get();
    let src = `${url}?username=${auth.username}&token=${auth.token}`;
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }
}
