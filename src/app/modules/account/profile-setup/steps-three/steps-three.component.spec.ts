import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsThreeComponent } from './steps-three.component';

describe('StepsThreeComponent', () => {
  let component: StepsThreeComponent;
  let fixture: ComponentFixture<StepsThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
