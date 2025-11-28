import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMainMapStateEventRealtimeComponent } from './system-main-map-state-event-realtime.component';

describe('SystemMainMapStateEventRealtimeComponent', () => {
  let component: SystemMainMapStateEventRealtimeComponent;
  let fixture: ComponentFixture<SystemMainMapStateEventRealtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemMainMapStateEventRealtimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMainMapStateEventRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
