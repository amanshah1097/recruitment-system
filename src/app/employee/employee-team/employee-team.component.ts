import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeTeamStructureData } from '../employee.classes';

@Component({
  selector: 'app-employee-team',
  templateUrl: './employee-team.component.html',
  styleUrls: ['./employee-team.component.scss']
})
export class EmployeeTeamComponent implements OnInit {

  employeeLineManagerList = new Array<string>();
  employeeSubordinatesList = new Array<string>();
  constructor( private _employeeService: EmployeeService) {
    this._employeeService.getEmployeeTeamStructureData().subscribe(
      (data:any)=> {
        this.employeeLineManagerList.push(...data.managerList);
        this.employeeSubordinatesList.push(...data.subOrdinatesList);
      },
    )
   }

  ngOnInit() {
  }

}
