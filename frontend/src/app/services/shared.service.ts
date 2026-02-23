import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private toastSubject = new BehaviorSubject<ToastMessage>({
    message: '',
    type: 'info',
    show: false
  });
  public toast$ = this.toastSubject.asObservable();

  constructor() { }

  showLoading() {
    console.log('📢 SharedService.showLoading() - Setting loading to TRUE');
    setTimeout(() => this.loadingSubject.next(true), 0);
  }

  hideLoading() {
    console.log('📢 SharedService.hideLoading() - Setting loading to FALSE');
    setTimeout(() => this.loadingSubject.next(false), 0);
  }

  showSuccess(message: string) {
    this.showToast(message, 'success');
  }

  showError(message: string) {
    this.showToast(message, 'error');
  }

  showInfo(message: string) {
    this.showToast(message, 'info');
  }

  showWarning(message: string) {
    this.showToast(message, 'warning');
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toastSubject.next({ message, type, show: true });
    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast() {
    this.toastSubject.next({ message: '', type: 'info', show: false });
  }
}
