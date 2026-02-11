import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMainPanelRoadObjectDetailsManagerComponent } from './system-main-panel-road-object-details-manager.component';

describe('SystemMainPanelRoadObjectDetailsManagerComponent', () => {
  let component: SystemMainPanelRoadObjectDetailsManagerComponent;
  let fixture: ComponentFixture<SystemMainPanelRoadObjectDetailsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemMainPanelRoadObjectDetailsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMainPanelRoadObjectDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
