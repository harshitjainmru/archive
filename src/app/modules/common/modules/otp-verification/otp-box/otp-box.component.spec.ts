import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpBoxComponent } from './otp-box.component';

describe('OtpBoxComponent', () => {
  let component: OtpBoxComponent;
  let fixture: ComponentFixture<OtpBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
