import { map } from 'rxjs/operators';
import { Status } from './../models/task-status.model';
import { Component, OnInit } from '@angular/core'
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { AuthService } from '../authentication/auth.service';
import { EmployeeService } from '../employee/employee.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ProjectService } from '../project/project.service';
import * as _ from 'lodash'
import { ActivatedRoute } from '@angular/router';
import {Chart,ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

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
      private _route: ActivatedRoute,
      private project: ProjectService
      ) {}

    currentUser = this.auth.currentUserValue;
    userId = this.currentUser.user_id;
    fname; role;url;
    projects; tasks; totalEmp;
    projectList: [];
    employeeList: [];
    labels = [];
    data = [];
    pieChart=[];
    ngOnInit(): void {

      this.getDashboardData();
      // this.getStatusStat()

    }

    getDashboardData() {

      this._route.data.subscribe((data: {stats : any}) => {

        const employee = data.stats[0].data;
        this.fname = employee.firstname;
        this.url = employee.avatar;
        this.role = employee.jobTitle;
        this.projects = data.stats[1].data.projects[0].count;
        this.tasks = data.stats[1].data.tasks[0].count;
        this.totalEmp = data.stats[1].data.employees[0].count;
        this.projectList = _.take(data.stats[2], 5);
        this.employeeList = _.take(data.stats[3].data, 5);
        this.pieChart= data.stats[4];
        const test = _(this.pieChart).map(_.values).unzip().value()
        const test2 = _(this.pieChart).map(_.keys).unzip().value()
        const labels = _.union(test2[0], test2[1], test2[2])
        const total = _.union(test[0], test[1], test[2])
        this.customersChartLabels= labels;
        this. customersChartData = total

      });

    }

    revenueChartFormat: string = 'revenueMonth';

    revenueChartData: Array<any> = [{
        data: [30, 60, 40, 50, 40, 55, 85, 65, 75, 50, 70],
        label: 'Series A'
    }];
    currentrevenueChartLabelsIdx = 1;
    revenueChartLabels:Array<any> = ["16th", "17th", "18th", "19th", "20th", "21th", "22th", "23th", "24th", "25th", "26th"];
    revenueChartOptions: any = {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
            mode: 'nearest',
            intersect: true
        },
        tooltips: {
            mode: 'index'
        },
        scales: {
            xAxes: [{
                gridLines: [{
                    display: false,
                }],
                ticks: {
                    display: true,
                    fontColor: this.themeColors.grayLight,
                    fontSize: 13,
                    padding: 10
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    drawTicks: false,
                    borderDash: [3, 4],
                    zeroLineWidth: 1,
                    zeroLineBorderDash: [3, 4]
                },
                ticks: {
                    display: true,
                    max: 100,
                    stepSize: 20,
                    fontColor: this.themeColors.grayLight,
                    fontSize: 13,
                    padding: 10
                }
            }],
        }
    };
    revenueChartColors: Array<any> = [
        {
            backgroundColor: this.themeColors.transparent,
            borderColor: this.blue,
            pointBackgroundColor: this.blue,
            pointBorderColor: this.themeColors.white,
            pointHoverBackgroundColor: this.blueLight,
            pointHoverBorderColor: this.blueLight
        }
    ];
    revenueChartType = 'line';

    customersChartLabels: string[] = this.labels;;
    customersChartData: number[] = this.data;
    customersChartColors: Array<any> =  [{
        backgroundColor: [this.cyan, this.purple, this.gold],
        pointBackgroundColor : [this.cyan, this.purple, this.gold]
    }];
    customersChartOptions: any = {
        cutoutPercentage: 75,
        maintainAspectRatio: false
    }
    customersChartType = 'doughnut';

}
