import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { MemberService } from '../shared/services/member/member.service';
import { Role } from '../_model/roles';
import { User } from '../_model/User';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  member: any;
  returnUrl: any;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private membersService: MemberService, 
    private route: ActivatedRoute,
) { }
async roleUrl(){
  let locals : User = JSON.parse(localStorage.getItem('loggedInUser'))
  if ( Role.Chairperson ==  locals.role || Role.Member == locals.role){
   
   
    this.member = Object.assign({}, ...await this.membersService.findMember(locals.id).toPromise())
  
    this.returnUrl = '/clubs' + '/'+ this.member.club
    this.router.navigate([this.returnUrl]); 
    }
  else{
     // get return url from route parameters or default to '/home'
    this.returnUrl = '/home';
    this.router.navigate([this.returnUrl]);
  }
 
}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (user) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
          // role not authorised so redirect to home page
          this.roleUrl()
          return false;
      }
        // logged in so return true
        return true;
    } else {
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
}
