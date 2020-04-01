import { Component, OnInit } from '@angular/core'
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { AuthService } from '../authentication/auth.service';
import { EmployeeService } from '../employee/employee.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ProjectService } from '../project/project.service';
import * as _ from 'lodash'
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
        `
        @media only screen and (min-width: 992px) {
            .completion-chart {
                width: calc(100% - 330px);
            }
        }
      `
  ]
})
export class HomeComponent implements OnInit {

  themeColors = this.colorConfig.get().colors;
    blue = this.themeColors.blue;
    blueLight = this.themeColors.blueLight;
    cyan = this.themeColors.cyan;
    cyanLight = this.themeColors.cyanLight;
    gold = this.themeColors.gold;
    purple = this.themeColors.purple;
    purpleLight = this.themeColors.purpleLight;
    red = this.themeColors.red;
    transparent = this.themeColors.transparent

    constructor(
      private colorConfig:ThemeConstantService,
      private auth: AuthenticationService,
      private _route: ActivatedRoute
      ) {}

    currentUser = this.auth.currentUserValue;
    userId = this.currentUser.user_id;
    fname; role;url;
    projects; tasks; totalEmp;
    projectList: [];
    employeeList: [];

    ngOnInit(): void {

      this.getDashboardData();
    }

    getDashboardData() {

      this._route.data.subscribe((data: {stats : any}) => {
        console.log(data.stats[3].data)
        const employee = data.stats[0].data;
        this.fname = employee.firstname;
        this.url = employee.avatar;
        this.role = employee.jobTitle;
        this.projects = data.stats[1].data.projects[0].count;
        this.tasks = data.stats[1].data.tasks[0].count;
        this.totalEmp = data.stats[1].data.employees[0].count;
        this.projectList = _.take(data.stats[2], 5);
        this.employeeList = _.take(data.stats[3].data, 5);
        console.log( this.employeeList);

      });

    }

}
