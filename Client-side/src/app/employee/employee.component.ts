import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {

  projectList: [];

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees() {
    this.empService.getEmployees().subscribe(res => {
      this.projectList = res;
      console.log("this is my project")
      console.log(this.projectList);
    });
  }

}
