import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectTimelineSimpleComponent } from './system-statistic-road-object-timeline-simple.component';

describe('SystemStatisticRoadObjectTimelineSimpleComponent', () => {
  let component: SystemStatisticRoadObjectTimelineSimpleComponent;
  let fixture: ComponentFixture<SystemStatisticRoadObjectTimelineSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectTimelineSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectTimelineSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
