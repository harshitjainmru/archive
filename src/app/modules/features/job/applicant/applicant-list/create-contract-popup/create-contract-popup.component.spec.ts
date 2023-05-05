import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractPopupComponent } from './create-contract-popup.component';

describe('CreateContractPopupComponent', () => {
  let component: CreateContractPopupComponent;
  let fixture: ComponentFixture<CreateContractPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContractPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
