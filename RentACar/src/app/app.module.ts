import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/demo.interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
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
import { VehicleComponent } from './vehicle/vehicle.component';

import { SocketserviceService } from './services/socketservice/socketservice.service';
import { UpdatevehicleComponent } from './updatevehicle/updatevehicle.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchListItemComponent } from './branch-list-item/branch-list-item.component';
import { AddPricelistComponent } from './add-pricelist/add-pricelist.component';

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
    path: 'addservice',
    component: AddServiceComponent,
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
  },
  {
    path: 'vehiclelist',
    component: CarlistComponent,
  },
  {
    path: 'servicepage',
    component: ServicePageComponent,
  },
  {
    path: 'updateVehicle',
    component: UpdatevehicleComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'addbranch',
    component: AddBranchComponent,
  },
  {
    path: 'addpricelist',
    component: AddPricelistComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    VehiclesComponent,
    VehicleComponent,
    UpdatevehicleComponent,
    AddBranchComponent,
    BranchListItemComponent,
    AddPricelistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [
    CanActivateViaAuthGuard,
    SocketserviceService,
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
