import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopNavbarComponent } from '../../components/top-navbar/top-navbar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopNavbarComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: Title) {}
  sidebarOpen = true;

  ngOnInit(): void {
    const storedSidebar = localStorage.getItem('sidebarOpen');
    if (storedSidebar !== null) {
      this.sidebarOpen = storedSidebar === 'true';
    }
    this.titleService.setTitle('Dashboard');
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    localStorage.setItem('sidebarOpen', this.sidebarOpen.toString());
  }
}
