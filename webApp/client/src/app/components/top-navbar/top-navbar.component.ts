import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-navbar.component.html',
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  currentTime: Date = new Date();
  private intervalId!: ReturnType<typeof setInterval>;

  showSearch: boolean = false;

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;

    if (this.showSearch) {
      // Wait for DOM render before focusing input
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      }, 0);
    }
  }

  toggleFullscreen(): void {
    const doc: any = document;

    if (
      !doc.fullscreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      const el = doc.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  }
}
