import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleSecurityMemberTableComponent } from './system-module-security-member-table.component';

describe('SystemModuleSecurityMemberTableComponent', () => {
  let component: SystemModuleSecurityMemberTableComponent;
  let fixture: ComponentFixture<SystemModuleSecurityMemberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleSecurityMemberTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleSecurityMemberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
