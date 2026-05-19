import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleSecurityDepartmentDetailsMemberManagerComponent } from './system-module-security-department-details-member-manager.component';

describe('SystemModuleSecurityDepartmentDetailsMemberManagerComponent', () => {
  let component: SystemModuleSecurityDepartmentDetailsMemberManagerComponent;
  let fixture: ComponentFixture<SystemModuleSecurityDepartmentDetailsMemberManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleSecurityDepartmentDetailsMemberManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleSecurityDepartmentDetailsMemberManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
