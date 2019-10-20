import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTechnicalInfoComponent } from './employee-technical-info.component';

describe('EmployeeTechnicalInfoComponent', () => {
  let component: EmployeeTechnicalInfoComponent;
  let fixture: ComponentFixture<EmployeeTechnicalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTechnicalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTechnicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
