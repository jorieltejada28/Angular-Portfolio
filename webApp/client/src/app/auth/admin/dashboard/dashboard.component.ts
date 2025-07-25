import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TopNavbarComponent } from '../../../components/top-navbar/top-navbar.component';
import { Title } from '@angular/platform-browser';
import { NgxChartsModule, ScaleType, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopNavbarComponent, NgxChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: Title) {}

  sidebarOpen = true;

  // ✅ Use enum for legend position
  legendPosition: LegendPosition = LegendPosition.Right;

  rawLineChartData = [
    {
      name: 'Saint Pierre and Miquelon',
      series: [
        { value: 2535, name: '2016-09-15T20:04:54.459Z' },
        { value: 5824, name: '2016-09-14T03:48:49.904Z' },
        { value: 6755, name: '2016-09-17T09:55:53.692Z' },
        { value: 3089, name: '2016-09-15T21:37:32.628Z' },
        { value: 2609, name: '2016-09-21T10:28:44.546Z' }
      ]
    },
    {
      name: 'Afghanistan',
      series: [
        { value: 2440, name: '2016-09-15T20:04:54.459Z' },
        { value: 2925, name: '2016-09-14T03:48:49.904Z' },
        { value: 6851, name: '2016-09-17T09:55:53.692Z' },
        { value: 2366, name: '2016-09-15T21:37:32.628Z' },
        { value: 4962, name: '2016-09-21T10:28:44.546Z' }
      ]
    },
    {
      name: 'American Samoa',
      series: [
        { value: 2099, name: '2016-09-15T20:04:54.459Z' },
        { value: 4952, name: '2016-09-14T03:48:49.904Z' },
        { value: 3911, name: '2016-09-17T09:55:53.692Z' },
        { value: 5144, name: '2016-09-15T21:37:32.628Z' },
        { value: 5891, name: '2016-09-21T10:28:44.546Z' }
      ]
    },
    {
      name: 'Afghanistan',
      series: [
        { value: 5436, name: '2016-09-15T20:04:54.459Z' },
        { value: 5142, name: '2016-09-14T03:48:49.904Z' },
        { value: 6246, name: '2016-09-17T09:55:53.692Z' },
        { value: 6888, name: '2016-09-15T21:37:32.628Z' },
        { value: 5214, name: '2016-09-21T10:28:44.546Z' }
      ]
    },
    {
      name: 'Svalbard and Jan Mayen',
      series: [
        { value: 4765, name: '2016-09-15T20:04:54.459Z' },
        { value: 5576, name: '2016-09-14T03:48:49.904Z' },
        { value: 6415, name: '2016-09-17T09:55:53.692Z' },
        { value: 2647, name: '2016-09-15T21:37:32.628Z' },
        { value: 2642, name: '2016-09-21T10:28:44.546Z' }
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

    // Sort and format date for readability
    this.lineChartData = this.rawLineChartData.map(item => ({
      name: item.name,
      series: item.series
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
        .map(point => ({
          value: point.value,
          name: new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric'
          }).format(new Date(point.name))
        }))
    }));
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    localStorage.setItem('sidebarOpen', this.sidebarOpen.toString());
  }
}
