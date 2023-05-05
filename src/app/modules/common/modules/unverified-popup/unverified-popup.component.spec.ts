import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedPopupComponent } from './unverified-popup.component';

describe('UnverifiedPopupComponent', () => {
  let component: UnverifiedPopupComponent;
  let fixture: ComponentFixture<UnverifiedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnverifiedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
