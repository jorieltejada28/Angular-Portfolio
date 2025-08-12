import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TopNavbarComponent } from '../../../components/top-navbar/top-navbar.component';
import { Title } from '@angular/platform-browser';
import { NgxChartsModule, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';

// Define interfaces for chart data
interface ChartSeries {
  value: number;
  name: string; // date string
}

interface ChartData {
  name: string; // country or region name
  series: ChartSeries[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopNavbarComponent, NgxChartsModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: Title) {}

  sidebarOpen = true;
  legendPosition: LegendPosition = LegendPosition.Right;

  // Use typed array for your chart data
  rawLineChartData: ChartData[] = [
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

  lineChartData: ChartData[] = [];

  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#7aa3e5']
  };

  tableData = [
    {
      date: '2025-08-01',
      metricA: 123,
      metricB: 456,
      metricC: 789,
      notes: 'Sample note 1'
    },
    {
      date: '2025-08-02',
      metricA: 234,
      metricB: 567,
      metricC: 890,
      notes: 'Sample note 2'
    },
    {
      date: '2025-08-03',
      metricA: 345,
      metricB: 678,
      metricC: 901,
      notes: 'Sample note 3'
    }
  ];

  filteredTableData = [...this.tableData];

  filterColumn: 'date' | 'metricA' | 'metricB' | 'metricC' | 'notes' = 'date';
  filterText = '';

  ngOnInit(): void {
    const storedSidebar = localStorage.getItem('sidebarOpen');
    if (storedSidebar !== null) {
      this.sidebarOpen = storedSidebar === 'true';
    }

    this.titleService.setTitle('Dashboard');

    // Now TypeScript knows the type of `item` so no more error
    this.lineChartData = this.rawLineChartData.map((item: ChartData) => ({
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

  applyFilter(): void {
    const filter = this.filterText.trim().toLowerCase();
    if (!filter) {
      this.filteredTableData = [...this.tableData];
      return;
    }

    this.filteredTableData = this.tableData.filter(row => {
      const value = row[this.filterColumn];
      return value.toString().toLowerCase().includes(filter);
    });
  }
}
