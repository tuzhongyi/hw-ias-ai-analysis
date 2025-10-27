import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleGpsTaskPictureContainerComponent } from './system-module-gps-task-picture-container.component';

describe('SystemModuleGpsTaskPictureContainerComponent', () => {
  let component: SystemModuleGpsTaskPictureContainerComponent;
  let fixture: ComponentFixture<SystemModuleGpsTaskPictureContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleGpsTaskPictureContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleGpsTaskPictureContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
