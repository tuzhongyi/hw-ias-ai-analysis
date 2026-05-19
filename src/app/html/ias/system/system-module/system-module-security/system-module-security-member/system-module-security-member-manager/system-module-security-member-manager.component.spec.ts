import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleSecurityMemberManagerComponent } from './system-module-security-member-manager.component';

describe('SystemModuleSecurityMemberManagerComponent', () => {
  let component: SystemModuleSecurityMemberManagerComponent;
  let fixture: ComponentFixture<SystemModuleSecurityMemberManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleSecurityMemberManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleSecurityMemberManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
