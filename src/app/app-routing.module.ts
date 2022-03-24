import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ClientsComponent } from './clients/clients.component';
import { ClubsComponent } from './clubs/clubs.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { StaffComponent } from './staff/staff.component';
import { SelectedclubComponent } from './clubs/selectedclub/selectedclub.component'
import { ClubformComponent } from './clubs/clubform/clubform.component';
import { SelectedmemberComponent } from './members/selectedmember/selectedmember.component';
import { MemberformComponent } from './members/memberform/memberform.component';
import { StaffformComponent } from './staff/staffform/staffform.component';
import { SelectedstaffComponent } from './staff/selectedstaff/selectedstaff.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { Role } from './_model/roles';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { ProjectformComponent } from './activities/projectform/projectform/projectform.component';
import { SelectedprojectComponent } from './activities/selectedproject/selectedproject/selectedproject.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'projects/form', component: ProjectformComponent, canActivate: [AuthGuard] },
  { path: 'projects/form/:id', component: ProjectformComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: SelectedprojectComponent, canActivate: [AuthGuard] },
  { path: 'clubs', component: ClubsComponent, canActivate: [AuthGuard] },
  { path: 'clubs/form', component: ClubformComponent, canActivate: [AuthGuard] },
  { path: 'clubs/form/:id', component: ClubformComponent, canActivate: [AuthGuard] },
  { path: 'clubs/:id', component: SelectedclubComponent, canActivate: [AuthGuard] },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

  { path: 'staffs', component: StaffComponent, canActivate: [AuthGuard] },
  { path: 'staffs/form', component: StaffformComponent, canActivate: [AuthGuard] },
  { path: 'staffs/form/:id', component: StaffformComponent, canActivate: [AuthGuard] },
  { path: 'staffs/:id', component: SelectedstaffComponent, canActivate: [AuthGuard] },


  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'members/form', component: MemberformComponent, canActivate: [AuthGuard] },
  { path: 'members/form/:id', component: MemberformComponent, canActivate: [AuthGuard] },
  { path: 'members/:id', component: SelectedmemberComponent, canActivate: [AuthGuard] },

  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'message', component: MessageComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
