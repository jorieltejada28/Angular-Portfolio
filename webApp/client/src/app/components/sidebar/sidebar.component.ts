import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() sidebarOpen: boolean = true;
  showModal: boolean = false;
  dropdownOpen: boolean = false;

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.showModal = false;
  }
}
