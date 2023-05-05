import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingReviewPopupComponent } from './rating-review-popup.component';

describe('RatingReviewPopupComponent', () => {
  let component: RatingReviewPopupComponent;
  let fixture: ComponentFixture<RatingReviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingReviewPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingReviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
