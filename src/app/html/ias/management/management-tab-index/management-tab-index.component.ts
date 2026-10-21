import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ContentHeaderTabComponent } from '../../share/header/content-header-tab/content-header-tab.component';
import {
  ManagementTabHeaderBusiness,
  ManagementTabItem,
} from './management-tab-index.business';

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  names: string[] = [];
  index = 0;
  private items: ManagementTabItem[] = [];

  ngOnInit(): void {
    this.regist();
    this.load();
  }

  private load() {
    const state = this.business.load(this.route.snapshot);
    this.items = state.items;
    this.names = state.items.map((x) => x.name);
    this.index = state.index;
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
    const item = this.items[index];
    if (item) {
      this.router.navigateByUrl(item.url);
    }
  }
}
