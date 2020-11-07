import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { RedirectService } from '../core/redirect.service';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private redirectService: RedirectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value,
      )
      .pipe(
        first(),
      )
      .subscribe({
        next: () => {
          this.router.navigate([
            !!this.redirectService.loginReturnUrl
              ? this.redirectService.loginReturnUrl
              : '/dashboard',
          ]);
        },
        error: (error) => {
          console.log(error);
          this.error = error;
          this.loading = false;
        },
      });
  }
}
