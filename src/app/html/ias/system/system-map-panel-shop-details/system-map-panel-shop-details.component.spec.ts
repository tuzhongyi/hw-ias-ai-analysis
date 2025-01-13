import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMapPanelShopDetailsComponent } from './system-map-panel-shop-details.component';

describe('SystemMapPanelShopDetailsComponent', () => {
  let component: SystemMapPanelShopDetailsComponent;
  let fixture: ComponentFixture<SystemMapPanelShopDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemMapPanelShopDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMapPanelShopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
