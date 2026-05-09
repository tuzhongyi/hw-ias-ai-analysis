import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement9Component } from './system-statistic-road-object-statement-9.component';

describe('SystemStatisticRoadObjectStatement9Component', () => {
  let component: SystemStatisticRoadObjectStatement9Component;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
