import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SkeletonComponent } from './skeleton/skeleton.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AfterViewInit {
  loading = true;

  constructor(
    private titleService: Title,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.titleService.setTitle('Sign Up');

    // Delay hiding the skeleton until view settles
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.loading = false;
        this.cdr.detectChanges();
      });
    });
  }
}
