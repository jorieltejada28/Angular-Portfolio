import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton/skeleton.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SkeletonComponent], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  loading: boolean = true;

  constructor(private titleService: Title, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.titleService.setTitle('Sign In');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.loading = false;
        this.cdr.detectChanges(); // Trigger change detection
      });
    });
  }
}
