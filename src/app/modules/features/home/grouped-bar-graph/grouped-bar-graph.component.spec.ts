import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedBarGraphComponent } from './grouped-bar-graph.component';

describe('GroupedBarGraphComponent', () => {
  let component: GroupedBarGraphComponent;
  let fixture: ComponentFixture<GroupedBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupedBarGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
