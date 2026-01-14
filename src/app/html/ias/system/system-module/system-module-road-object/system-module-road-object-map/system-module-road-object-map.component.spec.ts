import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleRoadObjectMapComponent } from './system-module-road-object-map.component';

describe('SystemModuleRoadObjectMapComponent', () => {
  let component: SystemModuleRoadObjectMapComponent;
  let fixture: ComponentFixture<SystemModuleRoadObjectMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleRoadObjectMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleRoadObjectMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
