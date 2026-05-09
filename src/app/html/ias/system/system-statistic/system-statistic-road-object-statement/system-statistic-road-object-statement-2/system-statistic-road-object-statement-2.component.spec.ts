import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatement2Component } from './system-statistic-road-object-statement-2.component';

describe('SystemStatisticRoadObjectStatement2Component', () => {
  let component: SystemStatisticRoadObjectStatement2Component;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatement2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatement2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
