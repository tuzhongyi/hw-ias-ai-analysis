import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectMapStateGroupComponent } from './system-statistic-road-object-map-state-group.component';

describe('SystemStatisticRoadObjectMapStateGroupComponent', () => {
  let component: SystemStatisticRoadObjectMapStateGroupComponent;
  let fixture: ComponentFixture<SystemStatisticRoadObjectMapStateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectMapStateGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectMapStateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
