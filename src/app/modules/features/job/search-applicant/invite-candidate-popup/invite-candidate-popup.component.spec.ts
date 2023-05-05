import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCandidatePopupComponent } from './invite-candidate-popup.component';

describe('InviteCandidatePopupComponent', () => {
  let component: InviteCandidatePopupComponent;
  let fixture: ComponentFixture<InviteCandidatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteCandidatePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCandidatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
