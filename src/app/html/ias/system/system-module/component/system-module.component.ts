import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, filter } from 'rxjs';
import { RouteTool } from '../../../../../common/tools/route-tool/route.tool';
import { ContentHeaderComponent } from '../../../share/header/content-header/content-header.component';

@Component({
  selector: 'ias-system-module',
  imports: [RouterOutlet, ContentHeaderComponent],
  templateUrl: './system-module.component.html',
  styleUrl: './system-module.component.less',
})
export class SystemModuleComponent implements OnInit {
  @Input() title: string = '';

  private destroyRef = inject(DestroyRef);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.regist();
    this.title = this.load();
  }

  /** 标题取自路由的 data.title，加页面时只在 system-routing.module.ts 写一行即可 */
  private load(): string {
    return RouteTool.title(this.router.routerState.snapshot.root);
  }

  private regist() {
    (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      ) as Observable<NavigationEnd>
    ).subscribe(() => {
      this.title = this.load();
    });
  }
}
