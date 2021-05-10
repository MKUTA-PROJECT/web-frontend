import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ClientsComponent } from './clients/clients.component';
import { ClubsComponent } from './clubs/clubs.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { StaffComponent } from './staff/staff.component';
import {SelectedclubComponent} from './clubs/selectedclub/selectedclub.component'
import { ClubformComponent } from './clubs/clubform/clubform.component';
import { SelectedmemberComponent } from './members/selectedmember/selectedmember.component';
import { MemberformComponent } from './members/memberform/memberform.component';
import { StaffformComponent } from './staff/staffform/staffform.component';
import { SelectedstaffComponent } from './staff/selectedstaff/selectedstaff.component';

const routes: Routes = [
  { path: 'activities', component: ActivitiesComponent},
  { path: 'clubs', component: ClubsComponent},
    { path: 'clubs/form', component: ClubformComponent},
    { path: 'clubs/:id', component: SelectedclubComponent},
    
  {path: 'home', component: HomeComponent },

  {path: 'staffs', component: StaffComponent},
    { path: 'staffs/form', component: StaffformComponent},
    { path: 'staffs/:id', component: SelectedstaffComponent},


  {path: 'members', component: MembersComponent},
    { path: 'members/form', component: MemberformComponent},
    { path: 'members/:id', component: SelectedmemberComponent},

  {path: 'clients', component: ClientsComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
