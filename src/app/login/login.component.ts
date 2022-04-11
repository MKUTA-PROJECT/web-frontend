import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MemberService } from '../shared/services/member/member.service';
import { AuthService } from '../_auth/auth.service';
import { memberArray } from '../_model/member';
import { Role } from '../_model/roles';
import { User } from '../_model/User';

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
  member: memberArray
  user : User = this.authenticationService.userValue
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthService,
    private router: Router,
    private membersService: MemberService, 
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


  }
  async roleUrl(){
    let locals : User = JSON.parse(localStorage.getItem('loggedInUser'))
    if ( Role.Chairperson ==  locals.role || Role.Member == locals.role){
     
     
      this.member = await this.membersService.findMember(locals.id).toPromise()
    
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/clubs' + '/'+ this.member.club
      this.router.navigate([this.returnUrl]); 
      }
    else{
       // get return url from route parameters or default to '/home'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      this.router.navigate([this.returnUrl]);
    }
   
  }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
  

    onSubmit() {
      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: () => {
                // Go to Specific url depending on role
                  this.roleUrl()
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }
}
