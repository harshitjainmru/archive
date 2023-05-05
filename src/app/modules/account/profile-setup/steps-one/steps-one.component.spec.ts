import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsOneComponent } from './steps-one.component';

describe('StepsOneComponent', () => {
  let component: StepsOneComponent;
  let fixture: ComponentFixture<StepsOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
