import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement5ItemComponent } from './system-statistic-road-object-statement-5-item.component';

describe('SystemStatisticRoadObjectStatement5ItemComponent', () => {
  let component: SystemStatisticRoadObjectStatement5ItemComponent;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement5ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement5ItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement5ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
