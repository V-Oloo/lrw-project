import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { NzMessageService } from 'ng-zorro-antd';
import { error } from 'protractor';
import { ExportService } from '../shared/services/export.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {

  employeeList: [];

  search : any;

  constructor(private empService: EmployeeService,  private message: NzMessageService, private exportService: ExportService) { }

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees() {
    this.empService.getEmployees().subscribe(res => {
      this.employeeList = res.data;
    });
  }

  deactivateEmployee(id: number) {
    this.empService.updateEmpStatus(id, {status : "INACTIVE"}).subscribe((res) => {
      this.message.create('success', `Employee Deactivated`);
      window.location.reload();
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }

  removeEmployee(id: number) {
    this.empService.updateEmpStatus(id, {status : "DELETED"}).subscribe((res) => {
      this.message.create('success', `Employee Deleted`);
      window.location.reload();
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }

  activateEmployee(id: number) {
    this.empService.updateEmpStatus(id, {status : "ACTIVE"}).subscribe((res) => {
      this.message.create('success', `Employee Activated`);
      window.location.reload();
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }

  export() {
    this.exportService.exportExcel(this.employeeList, 'employees');
  }

}
