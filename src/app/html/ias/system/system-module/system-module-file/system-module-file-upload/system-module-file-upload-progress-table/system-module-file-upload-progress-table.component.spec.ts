import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleFileUploadProgressTableComponent } from './system-module-file-upload-progress-table.component';

describe('SystemModuleFileUploadProgressTableComponent', () => {
  let component: SystemModuleFileUploadProgressTableComponent;
  let fixture: ComponentFixture<SystemModuleFileUploadProgressTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleFileUploadProgressTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleFileUploadProgressTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
