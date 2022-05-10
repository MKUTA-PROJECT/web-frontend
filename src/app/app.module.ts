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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MessageComponent } from './message/message.component';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { NotificationComponent } from './notification/notification.component';
import { ProjectformComponent } from './activities/projectform/projectform/projectform.component';
import { SelectedprojectComponent } from './activities/selectedproject/selectedproject/selectedproject.component';
import { ProjectdetailsComponent } from './activities/selectedproject/selectedproject/projectdetails/projectdetails/projectdetails.component';
import { ProjectmembersComponent } from './activities/selectedproject/selectedproject/projectmembers/projectmembers/projectmembers.component';
import { DialogComponent } from './activities/selectedproject/selectedproject/projectmembers/projectmembers/dialog/dialog/dialog.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { counterReducer } from './actions/counter.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentformComponent } from './members/selectedmember/paymentform/paymentform.component';

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
    MessageComponent,
    NotificationComponent,
    ProjectformComponent,
    SelectedprojectComponent,
    ProjectdetailsComponent,
    ProjectmembersComponent,
    DialogComponent,
    PaymentformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatTableExporterModule,
    AlertModule,
    TableauModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    ChatModule,
    StoreModule.forRoot({count: counterReducer}, {}),
    // StoreModule.forRoot(reducers, {
    //   metaReducers
    // }),
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
