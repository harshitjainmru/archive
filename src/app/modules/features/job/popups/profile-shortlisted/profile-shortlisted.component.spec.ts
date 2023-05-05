import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShortlistedComponent } from './profile-shortlisted.component';

describe('ProfileShortlistedComponent', () => {
  let component: ProfileShortlistedComponent;
  let fixture: ComponentFixture<ProfileShortlistedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileShortlistedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileShortlistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
