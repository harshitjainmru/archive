import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsSelectionComponent } from './shifts-selection.component';

describe('ShiftsSelectionComponent', () => {
  let component: ShiftsSelectionComponent;
  let fixture: ComponentFixture<ShiftsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
