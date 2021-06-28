import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_material/material.module';
import { HomeComponent } from './home/home.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ClubsComponent } from './clubs/clubs.component';
import { MembersComponent } from './members/members.component';
import { StaffComponent } from './staff/staff.component';
import { ClientsComponent } from './clients/clients.component';
import { ClubsService } from './shared/services/clubs/clubs.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectedclubComponent } from './clubs/selectedclub/selectedclub.component';
import { ClubformComponent } from './clubs/clubform/clubform.component';
import { ClubdetailsComponent } from './clubs/selectedclub/clubdetails/clubdetails.component';
import { ClubmembersComponent } from './clubs/selectedclub/clubmembers/clubmembers.component';
import { ClubleadersComponent } from './clubs/selectedclub/clubleaders/clubleaders.component';
import { ClubactivitiesComponent } from './clubs/selectedclub/clubactivities/clubactivities.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MemberformComponent } from './members/memberform/memberform.component';
import { SelectedmemberComponent } from './members/selectedmember/selectedmember.component';
import { MemberdetailComponent } from './members/selectedmember/memberdetail/memberdetail.component';
import { MemberactivitiesComponent } from './members/selectedmember/memberactivities/memberactivities.component';
import { StaffformComponent } from './staff/staffform/staffform.component';
import { SelectedstaffComponent } from './staff/selectedstaff/selectedstaff.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AlertModule } from './shared/_alert';
import { TableauModule } from 'ngx-tableau';
import { LoginComponent } from './login/login.component';
import { appInitializer } from './_auth/app.initializer';
import { JwtInterceptor } from './_auth/jwt.interceptor';
import { AuthService } from './_auth/auth.service';
import { ErrorInterceptor } from './_auth/error.interceptor';
import { NgxEchartsModule } from 'ngx-echarts';



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
    MemberformComponent,
    SelectedmemberComponent,
    MemberdetailComponent,
    MemberactivitiesComponent,
    StaffformComponent,
    SelectedstaffComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatTableExporterModule,
    AlertModule,
    TableauModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    
  ],
  providers: [
    ClubsService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
