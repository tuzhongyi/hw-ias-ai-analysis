import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemModuleShopListComponent } from './system-module-shop-list.component';

describe('SystemModuleShopListComponent', () => {
  let component: SystemModuleShopListComponent;
  let fixture: ComponentFixture<SystemModuleShopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemModuleShopListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemModuleShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
