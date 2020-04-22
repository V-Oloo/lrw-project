import { Component, OnInit } from '@angular/core'
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ProjectService } from '../project/project.service';
import * as _ from 'lodash'
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
    revenue = [];
    jobs = [];
    sum;
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
        this.revenue = data.stats[5]
        this.jobs = data.stats[6]
        console.log(this.jobs);
        console.log(this.pieChart);
        const test = _(this.pieChart).map(_.values).unzip().value()
        const test2 = _(this.pieChart).map(_.keys).unzip().value()
        const labels = _.union(test2[0], test2[1], test2[2])
        const total = _.concat(test[0], test[1], test[2])
        this.customersChartLabels= labels;
        this.customersChartData = total

         const rlabels = []; const rdata = [];
        _.forEach(this.revenue, function(value, key) {
           rlabels.push(value.month)
           rdata.push(value.revenue)
        })

        const jlabels = []; const jdata = [];
        _.forEach(this.jobs, function(value, key) {
           jlabels.push(value.name)
           jdata.push(value.jobs)
        })

        this. revenueChartLabels = jlabels;
        this.revenueChartData[0].data = jdata;

        this.salesChartLabels = rlabels
        this.salesChartData[0].data = rdata;

        this.sum = _.sum(rdata);
      });

    }

    salesChartOptions: any = {
      scaleShowVerticalLines: false,
      maintainAspectRatio: false,
      responsive: true,
      scales: {
          xAxes: [{
              categoryPercentage: 0.35,
              barPercentage: 0.70,
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Month'
              },
              gridLines: false,
              ticks: {
                  display: true,
                  beginAtZero: true,
                  fontSize: 13,
                  padding: 10
              }
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Revenue'
              },
              gridLines: {
                  drawBorder: false,
                  offsetGridLines: false,
                  drawTicks: false,
                  borderDash: [3, 4],
                  zeroLineWidth: 1,
                  zeroLineBorderDash: [3, 4]
              },
              ticks: {
                  max: 5000,
                  stepSize: 500,
                  display: true,
                  beginAtZero: true,
                  fontSize: 13,
                  padding: 10
              }
          }]
      }
  };
  salesChartLabels: string[] = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  salesChartType = 'bar';
  salesChartColors: Array<any> = [
      {
          backgroundColor: this.themeColors.blue,
          borderWidth: 0
      },
      // {
      //     backgroundColor: this.themeColors.blueLight,
      //     borderWidth: 0
      // }
  ];
  salesChartData: any[] = [
      {
          data: [20, 30, 35, 45, 55, 45],
          label: 'Revenue'
      },
      // {
      //     data: [25, 35, 40, 50, 60, 50],
      //     label: 'Offline'
      // }
  ];

    revenueChartFormat: string = 'revenueMonth';

    revenueChartData: Array<any> = [{
        data: [30, 60, 40, 50],
        label: 'Jobs'
    }];
    currentrevenueChartLabelsIdx = 1;
    revenueChartLabels:Array<any> = [];
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
                    stepSize: 10,
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
