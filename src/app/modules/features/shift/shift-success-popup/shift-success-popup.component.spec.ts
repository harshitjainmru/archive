import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSuccessPopupComponent } from './shift-success-popup.component';

describe('ShiftSuccessPopupComponent', () => {
  let component: ShiftSuccessPopupComponent;
  let fixture: ComponentFixture<ShiftSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftSuccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
