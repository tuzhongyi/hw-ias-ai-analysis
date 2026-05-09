import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement1Component } from './system-statistic-road-object-statement-1.component';

describe('SystemStatisticRoadObjectStatement1Component', () => {
  let component: SystemStatisticRoadObjectStatement1Component;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
