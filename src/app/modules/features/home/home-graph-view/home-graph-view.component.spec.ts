import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGraphViewComponent } from './home-graph-view.component';

describe('HomeGraphViewComponent', () => {
  let component: HomeGraphViewComponent;
  let fixture: ComponentFixture<HomeGraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGraphViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
