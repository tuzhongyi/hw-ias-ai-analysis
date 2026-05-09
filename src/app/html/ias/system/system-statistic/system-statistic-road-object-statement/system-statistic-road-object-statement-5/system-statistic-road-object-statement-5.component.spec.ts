import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement5Component } from './system-statistic-road-object-statement-5.component';

describe('SystemStatisticRoadObjectStatement5Component', () => {
  let component: SystemStatisticRoadObjectStatement5Component;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
