import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationPopupComponent } from './admin-notification-popup.component';

describe('AdminNotificationPopupComponent', () => {
  let component: AdminNotificationPopupComponent;
  let fixture: ComponentFixture<AdminNotificationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNotificationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
