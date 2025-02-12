import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleRoadCreationComponent } from './system-module-road-creation.component';

describe('SystemModuleRoadCreationComponent', () => {
  let component: SystemModuleRoadCreationComponent;
  let fixture: ComponentFixture<SystemModuleRoadCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleRoadCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleRoadCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
