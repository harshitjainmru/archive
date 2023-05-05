import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBusinessCategoryComponent } from './search-business-category.component';

describe('SearchBusinessCategoryComponent', () => {
  let component: SearchBusinessCategoryComponent;
  let fixture: ComponentFixture<SearchBusinessCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBusinessCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBusinessCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
