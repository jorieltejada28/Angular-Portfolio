import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Landing Page');
  }

  readonly features = [
    {
      title: 'Responsive Design',
      description: 'Looks great on all devices with adaptive layout and responsive components.'
    },
    {
      title: 'Fast Performance',
      description: 'Optimized for speed and efficiency using Angular best practices.'
    },
    {
      title: 'Modern UI',
      description: 'Sleek interface with Tailwind CSS for a consistent and professional look.'
    }
  ];
}
