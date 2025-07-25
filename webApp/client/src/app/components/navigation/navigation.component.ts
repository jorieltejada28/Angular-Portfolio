import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonComponent } from './skeleton/skeleton.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonComponent],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements AfterViewInit {
  isLoading: boolean = true;

  readonly navLinkClass = 'text-gray-700 hover:text-blue-600 transition';
  readonly buttonClass = 'px-4 py-1 rounded transition';

  readonly navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Contact', path: '/contact' }
  ];

  readonly authLinks = [
    {
      label: 'Sign In',
      path: '/signin',
      classes: 'text-white bg-blue-600 hover:bg-blue-700'
    },
    {
      label: 'Sign Up',
      path: '/signup',
      classes: 'text-blue-600 border border-blue-600 hover:bg-blue-100'
    }
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    });
  }
}

