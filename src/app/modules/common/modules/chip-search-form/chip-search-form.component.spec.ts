import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipSearchFormComponent } from './chip-search-form.component';

describe('ChipSearchFormComponent', () => {
  let component: ChipSearchFormComponent;
  let fixture: ComponentFixture<ChipSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
