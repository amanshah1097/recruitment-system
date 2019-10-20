import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBasicDetailComponent } from './employee-basic-detail.component';

describe('EmployeeBasicDetailComponent', () => {
  let component: EmployeeBasicDetailComponent;
  let fixture: ComponentFixture<EmployeeBasicDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBasicDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBasicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
