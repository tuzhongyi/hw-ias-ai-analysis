import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement5ChartComponent } from './system-statistic-road-object-statement-5-chart.component';

describe('SystemStatisticRoadObjectStatement5ChartComponent', () => {
  let component: SystemStatisticRoadObjectStatement5ChartComponent;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement5ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement5ChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement5ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
