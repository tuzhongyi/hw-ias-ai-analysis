import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementNetworkIndexComponent } from './management-network-index.component';

describe('ManagementNetworkIndexComponent', () => {
  let component: ManagementNetworkIndexComponent;
  let fixture: ComponentFixture<ManagementNetworkIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementNetworkIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementNetworkIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
