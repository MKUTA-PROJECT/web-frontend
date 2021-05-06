import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ClubsComponent } from './clubs/clubs.component';
import { MembersComponent } from './members/members.component';
import { StaffComponent } from './staff/staff.component';
import { ClientsComponent } from './clients/clients.component';
import { ClubsService } from './shared/services/clubs/clubs.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectedclubComponent } from './clubs/selectedclub/selectedclub.component';
import { ClubformComponent } from './clubs/clubform/clubform.component';
import { ClubdetailsComponent } from './clubs/selectedclub/clubdetails/clubdetails.component';
import { ClubmembersComponent } from './clubs/selectedclub/clubmembers/clubmembers.component';
import { ClubleadersComponent } from './clubs/selectedclub/clubleaders/clubleaders.component';
import { ClubactivitiesComponent } from './clubs/selectedclub/clubactivities/clubactivities.component';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivitiesComponent,
    ClubsComponent,
    MembersComponent,
    StaffComponent,
    ClientsComponent,
    SelectedclubComponent,
    ClubformComponent,
    ClubdetailsComponent,
    ClubmembersComponent,
    ClubleadersComponent,
    ClubactivitiesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollingModule
    
  ],
  providers: [
    ClubsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
