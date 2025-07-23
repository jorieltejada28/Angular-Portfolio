import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FEATURES } from '../data/features';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements AfterViewInit {
  isLoading = true;
  features: any[] = [];
  currentBg: 'white' | 'gray-50' | 'blue-50' = 'white';

  constructor(
    private titleService: Title,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.titleService.setTitle('Landing Page');
    this.features = FEATURES; // Load after DOM is ready

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.isLoading = false;
        this.cdr.detectChanges(); // Ensure skeleton loader disappears
      });
    });
  }
}
