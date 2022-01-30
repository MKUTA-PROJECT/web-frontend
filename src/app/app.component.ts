import { Component } from '@angular/core';
import { AuthService } from './_auth/auth.service';
import { Role } from './_model/roles';
import { User } from './_model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;
  isShowing: boolean;
  constructor(private authenticationService: AuthService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
  }

  help(){
    console.log("It is happening!!")
    
  }
  toggle(){
    this.isShowing = !this.isShowing;
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get isMember() {
    return this.user && this.user.role === Role.Member || this.user && this.user.role === Role.Chairperson;
  }



  title = ' MKUTA NETWORKS INFORMATION MANAGEMENT SYSTEM (MIMS)';
  locals : User = JSON.parse(localStorage.getItem('loggedInUser'))

  // Check if the user is logged in and get the name
  getName(){
    if(this.locals){
      let name = this.locals.name
      // Usee regex
      return name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    }
    else{
      return ''
    }
  }
  username = this.getName()
  

}
