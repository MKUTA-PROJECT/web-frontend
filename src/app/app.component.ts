import { Component, OnInit } from '@angular/core';
import { AuthService } from './_auth/auth.service';
import { Role } from './_model/roles';
import { User } from './_model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component2.html',
  styleUrls: ['./app.component2.scss']
})
export class AppComponent {
  user: User;

  role: Role;
  menuItems: {
    id: string,
    path: string,
    label: string;
  }[];

  isShowing: boolean;
  constructor(private authenticationService: AuthService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
  }

  help() {
    console.log("It is happening!!")

  }
  toggle() {
    this.isShowing = !this.isShowing;
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get isMember() {
    return this.user && this.user.role === Role.Member || this.user && this.user.role === Role.Chairperson;
  }



  title = ' MKUTA NETWORKS INFORMATION MANAGEMENT SYSTEM (MNIMS)';
  locals: User = JSON.parse(localStorage.getItem('loggedInUser'))

  // Check if the user is logged in and get the name
  getName() {
    if (this.locals) {
      let name = this.locals.name
      // Usee regex
      return name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    }
    else {
      return ''
    }
  }
  username = this.getName()

  getMenuItems(role: Role) {
    switch (role) {
      case Role.Admin:
        return [
          { id: 'menu-item-home', path: 'home', label: 'Home' },
          { id: 'menu-item-work', path: 'projects', label: 'Projects' },
          { id: 'menu-item-schedule', path: 'clubs', label: 'Clubs' },
          { id: 'menu-item-settings', path: 'members', label: 'Members' },
          { id: 'menu-item-settings', path: 'staffs', label: 'Staff' },
        ];

      case Role.Member:
        return [
          { id: 'menu-item-home', path: 'home', label: 'Home' },
          { id: 'menu-item-payment', path: 'payments', label: 'Payment' },
          { id: 'menu-item-leadership', path: 'leadership', label: 'Leadership' },
        ];

      default:
        break;
    }
  }

  ngOnInit(): void {
    this.role = this.user.role
    this.menuItems = this.getMenuItems(this.role)
  }
}
