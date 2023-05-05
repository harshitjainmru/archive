import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserProfileSuccessComponent } from './edit-user-profile-success.component';

describe('EditUserProfileSuccessComponent', () => {
  let component: EditUserProfileSuccessComponent;
  let fixture: ComponentFixture<EditUserProfileSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserProfileSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserProfileSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
