import { Component, OnInit } from '@angular/core'
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { AuthService } from '../authentication/auth.service';
import { EmployeeService } from '../employee/employee.service';
import { AuthenticationService } from '../shared/services/authentication.service';

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

    constructor( private colorConfig:ThemeConstantService, private auth: AuthenticationService, private empService: EmployeeService ) {}

    currentUser = this.auth.currentUserValue;
    userId = this.currentUser.user_id;
    fname; role;
    projects; tasks; employees;

    ngOnInit(): void {
      this.empService.getEmployee(this.userId).subscribe((res: any) => {
        console.log(this.userId);
        const employee = res.data;
        this.fname = employee.firstname;
        this.role = employee.jobTitle;

      });

      this.empService.dashboardStats().subscribe((res: any) => {
          this.projects = res.data.projects[0].count;
          this.tasks = res.data.tasks[0].count;
          this.employees = res.data.employees[0].count;
      });

    }
}
