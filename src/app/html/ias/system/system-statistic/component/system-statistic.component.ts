import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { RouteTool } from '../../../../../common/tools/route-tool/route.tool';
import { ContentHeaderComponent } from '../../../share/header/content-header/content-header.component';

@Component({
  selector: 'ias-system-statistic',
  imports: [RouterOutlet, CommonModule, ContentHeaderComponent],
  templateUrl: './system-statistic.component.html',
  styleUrl: './system-statistic.component.less',
})
export class SystemStatisticComponent implements OnInit {
  @Input() title: string = '';

  private destroyRef = inject(DestroyRef);

  constructor(private router: Router) {}

  private headable = true;

  /** 子页面自带标题栏时（路由 data.headable = false）不画父级的这条 */
  get head() {
    return this.headable;
  }

  ngOnInit(): void {
    this.regist();
    this.load();
  }

  /** 标题和是否显示标题栏都取自路由 data，和 system-module 同一套规则 */
  private load() {
    let root = this.router.routerState.snapshot.root;
    this.title = RouteTool.title(root);
    this.headable = RouteTool.headable(root);
  }

  private regist() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.load();
      });
  }
}
