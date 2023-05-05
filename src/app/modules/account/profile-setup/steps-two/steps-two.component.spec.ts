import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsTwoComponent } from './steps-two.component';

describe('StepsTwoComponent', () => {
  let component: StepsTwoComponent;
  let fixture: ComponentFixture<StepsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
