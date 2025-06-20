import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTaskShopAnalysisInfoDetailsComponent } from './system-task-shop-analysis-info-details.component';

describe('SystemTaskShopAnalysisInfoDetailsComponent', () => {
  let component: SystemTaskShopAnalysisInfoDetailsComponent;
  let fixture: ComponentFixture<SystemTaskShopAnalysisInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemTaskShopAnalysisInfoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemTaskShopAnalysisInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
