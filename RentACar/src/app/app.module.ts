import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/demo.interceptor';

import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HeaderComponent } from './header/header.component';
import { CarlistitemComponent } from './carlistitem/carlistitem.component';
import { CarlistComponent } from './carlist/carlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { ServicelistitemComponent } from './servicelistitem/servicelistitem.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { CommunicationService } from './services/communicationservice/communication.service';
import { ManagerlistComponent } from './managerlist/managerlist.component';
import { ManagerlistitemComponent } from './managerlistitem/managerlistitem.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserlistitemComponent } from './userlistitem/userlistitem.component';
import { AddServiceComponent } from './add-service/add-service.component';

import { CanActivateViaAuthGuard } from './guard/auth.guard';
import { ServicePageComponent } from './service-page/service-page.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationitemComponent } from './notificationitem/notificationitem.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
   },
  {
    path: 'home',
    component: VehiclesComponent,
  },
  {
    path: 'managers',
    component: ManagerlistComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verifyaccount',
    component: VerifyAccountComponent
  },
  {
    path: 'users',
    component: UserlistComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'servicelist',
    component: ServicelistComponent,
  },
  {
    path: 'addvehicle',
    component: AddvehicleComponent,
  },
  {
    path: 'vehicles',
    component: MainpageComponent,
  },
  {
    path: 'vehiclelist',
    component: CarlistComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HeaderComponent,
    CarlistitemComponent,
    CarlistComponent,
    LoginComponent,
    RegisterComponent,
    AddvehicleComponent,
    ServicelistComponent,
    ServicelistitemComponent,
    VerifyAccountComponent,
    ManagerlistComponent,
    ManagerlistitemComponent,
    UserlistComponent,
    UserlistitemComponent,
    AddServiceComponent,
    ServicePageComponent,
    NotificationsComponent,
    NotificationitemComponent,
    VehiclesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CanActivateViaAuthGuard,
    CommunicationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'CanAlwaysActivateGuard',
      useValue: () => {
        return true;
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
