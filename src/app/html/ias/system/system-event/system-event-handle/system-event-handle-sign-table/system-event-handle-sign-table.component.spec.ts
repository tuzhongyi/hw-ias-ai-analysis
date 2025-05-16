import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEventHandleSignTableComponent } from './system-event-handle-sign-table.component';

describe('SystemEventHandleSignTableComponent', () => {
  let component: SystemEventHandleSignTableComponent;
  let fixture: ComponentFixture<SystemEventHandleSignTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemEventHandleSignTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemEventHandleSignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
