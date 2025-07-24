import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TopNavbarComponent } from '../../../components/top-navbar/top-navbar.component';
import { Title } from '@angular/platform-browser';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopNavbarComponent, NgxChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: Title) {}

  sidebarOpen = true;

  pieChartData1 = [
    { name: 'Human Resources', value: 25 },
    { name: 'Engineering Department', value: 40 },
    { name: 'Sales Team', value: 20 },
    { name: 'Marketing Division', value: 15 }
  ];

  rawLineChartData = [
    {
      name: 'Algeria',
      series: [
        { value: 6613, name: '2016-09-21T09:33:52.454Z' },
        { value: 3137, name: '2016-09-13T19:07:17.538Z' },
        { value: 2201, name: '2016-09-16T22:50:01.450Z' },
        { value: 4283, name: '2016-09-14T23:40:10.101Z' },
        { value: 2416, name: '2016-09-23T17:17:14.127Z' }
      ]
    },
    {
      name: 'Gibraltar',
      series: [
        { value: 3246, name: '2016-09-21T09:33:52.454Z' },
        { value: 5245, name: '2016-09-13T19:07:17.538Z' },
        { value: 3774, name: '2016-09-16T22:50:01.450Z' },
        { value: 5507, name: '2016-09-14T23:40:10.101Z' },
        { value: 3997, name: '2016-09-23T17:17:14.127Z' }
      ]
    },
    {
      name: 'Poland',
      series: [
        { value: 2752, name: '2016-09-21T09:33:52.454Z' },
        { value: 4774, name: '2016-09-13T19:07:17.538Z' },
        { value: 5475, name: '2016-09-16T22:50:01.450Z' },
        { value: 6282, name: '2016-09-14T23:40:10.101Z' },
        { value: 5828, name: '2016-09-23T17:17:14.127Z' }
      ]
    },
    {
      name: 'Italy',
      series: [
        { value: 5494, name: '2016-09-21T09:33:52.454Z' },
        { value: 5170, name: '2016-09-13T19:07:17.538Z' },
        { value: 4754, name: '2016-09-16T22:50:01.450Z' },
        { value: 6977, name: '2016-09-14T23:40:10.101Z' },
        { value: 2999, name: '2016-09-23T17:17:14.127Z' }
      ]
    },
    {
      name: 'Mongolia',
      series: [
        { value: 5308, name: '2016-09-21T09:33:52.454Z' },
        { value: 5237, name: '2016-09-13T19:07:17.538Z' },
        { value: 3313, name: '2016-09-16T22:50:01.450Z' },
        { value: 2979, name: '2016-09-14T23:40:10.101Z' },
        { value: 3653, name: '2016-09-23T17:17:14.127Z' }
      ]
    }
  ];

  lineChartData: any[] = [];

  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#7aa3e5']
  };

  ngOnInit(): void {
    const storedSidebar = localStorage.getItem('sidebarOpen');
    if (storedSidebar !== null) {
      this.sidebarOpen = storedSidebar === 'true';
    }

    this.titleService.setTitle('Dashboard');

    // Format lineChartData dates into 'MMM dd' like 'Sep 13'
    this.lineChartData = this.rawLineChartData.map(country => ({
      name: country.name,
      series: country.series
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
        .map(point => ({
          value: point.value,
          name: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(point.name))
        }))
    }));
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    localStorage.setItem('sidebarOpen', this.sidebarOpen.toString());
  }
}
