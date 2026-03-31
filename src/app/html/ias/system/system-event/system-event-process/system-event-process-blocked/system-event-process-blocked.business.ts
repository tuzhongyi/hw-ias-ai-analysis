import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEventProcessBlockedComponent } from './system-event-process-blocked.component';

describe('SystemEventProcessBlockedComponent', () => {
  let component: SystemEventProcessBlockedComponent;
  let fixture: ComponentFixture<SystemEventProcessBlockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemEventProcessBlockedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemEventProcessBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
