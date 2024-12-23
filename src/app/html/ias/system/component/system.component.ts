import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SystemHeadComponent } from '../system-head/system-head.component';

@Component({
  selector: 'ias-system',
  imports: [RouterOutlet, SystemHeadComponent],
  templateUrl: './system.component.html',
  styleUrl: './system.component.less',
})
export class SystemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
