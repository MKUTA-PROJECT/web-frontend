import { Component } from '@angular/core';
import { AuthService } from './_auth/auth.service';
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

  toggle(){
    this.isShowing = !this.isShowing;
  }



  title = ' MKUTA INFORMATION MANAGEMENT SYSTEM (MIMS)';
  username = 'Simon Machera'
  links = [
    {path: '/home', icon: 'home', title: 'Home'},
    {path: '/activities', icon: 'local_activity', title: 'Activities'},
    {path: 'clubs', icon: 'house_siding', title: 'Clubs'},
    {path: '/clients', icon: 'people', title: 'Clients'},
    {path: '/members', icon: 'people', title: 'Members'},
    {path: '/staffs', icon: 'people_outline', title: 'Staffs'}
  ];
}
