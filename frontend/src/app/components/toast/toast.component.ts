import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, ToastMessage } from '../../services/shared.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11">
      <div *ngIf="toast.show" 
           class="toast show align-items-center border-0" 
           [ngClass]="getToastClass()"
           role="alert">
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                  (click)="closeToast()"></button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast {
      opacity: 1 !important;
    }
  `],
  imports: [CommonModule]
})
export class ToastComponent implements OnInit {
  toast: ToastMessage = { message: '', type: 'info', show: false };

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.toast$.subscribe(toast => {
      this.toast = toast;
    });
  }

  getToastClass(): string {
    switch (this.toast.type) {
      case 'success':
        return 'text-bg-success';
      case 'error':
        return 'text-bg-danger';
      case 'warning':
        return 'text-bg-warning';
      default:
        return 'text-bg-info';
    }
  }

  closeToast() {
    this.sharedService.hideToast();
  }
}
