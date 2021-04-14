import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ClientsComponent } from './clients/clients.component';
import { ClubsComponent } from './clubs/clubs.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { StaffComponent } from './staff/staff.component';


const routes: Routes = [
  { path: 'activities', component: ActivitiesComponent},
  { path: 'clubs', component: ClubsComponent},
  { path: 'home', component: HomeComponent },
  {path: 'members', component: MembersComponent},
  {path: 'staffs', component: StaffComponent},
  {path: 'clients', component: ClientsComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
