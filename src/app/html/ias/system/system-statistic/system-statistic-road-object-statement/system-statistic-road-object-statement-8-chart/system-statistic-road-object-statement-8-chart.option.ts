import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement8ChartComponent } from './system-statistic-road-object-statement-8-chart.component';

describe('SystemStatisticRoadObjectStatement8ChartComponent', () => {
  let component: SystemStatisticRoadObjectStatement8ChartComponent;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement8ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement8ChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement8ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
