import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMapSourceManagerComponent } from './system-map-source-manager.component';

describe('SystemMapSourceManagerComponent', () => {
  let component: SystemMapSourceManagerComponent;
  let fixture: ComponentFixture<SystemMapSourceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemMapSourceManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMapSourceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
