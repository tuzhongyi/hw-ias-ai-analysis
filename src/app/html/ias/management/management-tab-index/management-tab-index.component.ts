import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ContentHeaderTabComponent } from '../../share/header/content-header-tab/content-header-tab.component';
import { ManagementPathNode } from '../management-path/management.path';
import { ManagementTabHeaderBusiness } from './management-tab-index.business';

@Component({
  selector: 'ias-management-tab-index',
  imports: [RouterOutlet, ContentHeaderTabComponent],
  templateUrl: './management-tab-index.component.html',
  styleUrl: './management-tab-index.component.less',
  providers: [ManagementTabHeaderBusiness],
})
export class ManagementTabIndexComponent {
  constructor(
    private business: ManagementTabHeaderBusiness,
    private router: Router
  ) {}

  names = ['设备信息', '时间'];
  nodes: ManagementPathNode[] = [];
  index = 0;

  ngOnInit(): void {
    this.regist();
    this.load();
  }

  private load() {
    let node = this.business.load();
    if (node && node.children) {
      this.names = node.children.map((x) => x.name);
      this.nodes = node.children;

      this.index = this.business.index(this.nodes);
    }
  }

  private regist() {
    (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ) as Observable<NavigationEnd>
    ).subscribe((router) => {
      this.load();
    });
  }

  onselect(index: number) {
    let node = this.nodes[index];
    this.router.navigateByUrl(node.path);
  }
}
