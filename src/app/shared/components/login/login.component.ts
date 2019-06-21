import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../core/services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string;

  private unsubscribe: Subject<void> = new Subject();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.setMessage();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onLogin() {
    this.message = 'Trying to log in ...';
    this.authService
      .login()
      // The TakeUntil subscribes and begins mirroring the source Observable.
      // It also monitors a second Observable that you provide.
      // If this second Observable emits an item or sends a termination notification,
      // the Observable returned by TakeUntil stops mirroring the source Observable and terminates.
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        () => {
          this.setMessage();
          if (this.authService.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            const redirect = this.authService.redirectUrl
              ? this.authService.redirectUrl
              : '/admin';

             // Redirect the user
            this.router.navigate([redirect]);
          }
        },
        err => console.error(err)
      );
  }

  onLogout() {
    this.authService.logout();
    this.setMessage();
  }

  private setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
}
