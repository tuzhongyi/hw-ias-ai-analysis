import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement6Component } from './system-statistic-road-object-statement-6.component';

describe('SystemStatisticRoadObjectStatement6Component', () => {
  let component: SystemStatisticRoadObjectStatement6Component;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
