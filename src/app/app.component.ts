import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
