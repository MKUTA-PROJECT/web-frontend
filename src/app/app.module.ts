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



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivitiesComponent,
    ClubsComponent,
    MembersComponent,
    StaffComponent,
    ClientsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
