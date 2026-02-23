import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="loader-overlay" *ngIf="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
  `],
  imports: [CommonModule]
})
export class LoaderComponent implements OnInit {
  loading = false;

  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sharedService.loading$.subscribe(loading => {
      console.log('🔄 Loader state changed:', loading);
      this.loading = loading;
      this.cdr.detectChanges();
    });
  }
}
