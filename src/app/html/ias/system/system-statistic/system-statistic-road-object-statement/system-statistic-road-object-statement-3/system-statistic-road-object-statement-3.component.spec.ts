import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement3Component } from './system-statistic-road-object-statement-3.component';

describe('SystemStatisticRoadObjectStatement3Component', () => {
  let component: SystemStatisticRoadObjectStatement3Component;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
