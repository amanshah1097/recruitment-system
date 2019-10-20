import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';




import { EmployeeDetail } from './employee.classes';
import { EmployeeService } from './employee.service';

interface IReturn {
  records:any;
}

@Injectable()
export class employeeResolverInterface implements Resolve<any> {

  constructor(private _employeeService: EmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
     return this._employeeService.getEmployeeById();
  }

}
@Injectable()
export class employeeListResolverInterface implements Resolve<any> {

  constructor(private _employeeService: EmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
     return this._employeeService.getAllEmployee();
  }

}