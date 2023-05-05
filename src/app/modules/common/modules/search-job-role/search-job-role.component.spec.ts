import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobRoleComponent } from './search-job-role.component';

describe('SearchJobRoleComponent', () => {
  let component: SearchJobRoleComponent;
  let fixture: ComponentFixture<SearchJobRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJobRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
