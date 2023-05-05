import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectJobareaComponent } from './select-jobarea.component';

describe('SelectJobareaComponent', () => {
  let component: SelectJobareaComponent;
  let fixture: ComponentFixture<SelectJobareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectJobareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectJobareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
