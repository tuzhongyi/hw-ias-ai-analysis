import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatisticRoadObjectStatementContainerComponent } from './system-statistic-road-object-statement-container.component';

describe('SystemStatisticRoadObjectStatementContainerComponent', () => {
  let component: SystemStatisticRoadObjectStatementContainerComponent;
  let fixture: ComponentFixture<SystemStatisticRoadObjectStatementContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatisticRoadObjectStatementContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatisticRoadObjectStatementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
