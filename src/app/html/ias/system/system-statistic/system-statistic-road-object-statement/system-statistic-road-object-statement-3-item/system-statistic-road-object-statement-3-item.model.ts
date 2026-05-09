import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement3ItemComponent } from './system-statistic-road-object-statement-3-item.component';

describe('SystemStatisticRoadObjectStatement3ItemComponent', () => {
  let component: SystemStatisticRoadObjectStatement3ItemComponent;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement3ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement3ItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement3ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
