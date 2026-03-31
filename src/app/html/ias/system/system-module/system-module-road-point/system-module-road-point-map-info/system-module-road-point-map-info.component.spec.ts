import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleRoadPointMapInfoComponent } from './system-module-road-point-map-info.component';

describe('SystemModuleRoadPointMapInfoComponent', () => {
  let component: SystemModuleRoadPointMapInfoComponent;
  let fixture: ComponentFixture<SystemModuleRoadPointMapInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleRoadPointMapInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleRoadPointMapInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
