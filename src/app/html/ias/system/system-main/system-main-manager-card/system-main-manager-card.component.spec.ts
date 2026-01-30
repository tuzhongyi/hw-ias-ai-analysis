import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMainManagerCardComponent } from './system-main-manager-card.component';

describe('SystemMainManagerCardComponent', () => {
  let component: SystemMainManagerCardComponent;
  let fixture: ComponentFixture<SystemMainManagerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemMainManagerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMainManagerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
