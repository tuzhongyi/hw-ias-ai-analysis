import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleMobileDeviceComponent } from './system-module-mobile-device.component';

describe('SystemModuleMobileDeviceComponent', () => {
  let component: SystemModuleMobileDeviceComponent;
  let fixture: ComponentFixture<SystemModuleMobileDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleMobileDeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleMobileDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
