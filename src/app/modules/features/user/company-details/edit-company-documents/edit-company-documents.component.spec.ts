import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyDocumentsComponent } from './edit-company-documents.component';

describe('EditCompanyDocumentsComponent', () => {
  let component: EditCompanyDocumentsComponent;
  let fixture: ComponentFixture<EditCompanyDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
