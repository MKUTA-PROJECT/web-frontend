import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: any;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthService,
    private router: Router,
  ) {
     // redirect to home if already logged in
     if (this.authenticationService.userValue) { 
      this.router.navigate(['/home']);
     }
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
  });

    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

  }33

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
  

    onSubmit() {
      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.router.navigate([this.returnUrl]);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }
}
