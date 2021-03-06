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

import { CanActivateViaAdminAuthGuard } from './guardAdmin/auth.guard';
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
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UpdateserviceComponent } from './updateservice/updateservice.component';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { VehicleTypesComponent } from './vehicle-types/vehicle-types.component';
import { ManagerGuard } from './guardManager/manager-guard.guard';
import { UpdateBranchComponent } from './update-branch/update-branch.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { NgxPayPalModule } from '../../projects/ngx-paypal-lib/src/public_api';

const Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
   },
  {
    path: 'home',
    component: VehiclesComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'managers',
    component: ManagerlistComponent,
    canActivate: [CanActivateViaAdminAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'verifyaccount',
    component: VerifyAccountComponent
  },
  {
    path: 'users',
    component: UserlistComponent,
    canActivate: [CanActivateViaAdminAuthGuard]
  },
  {
    path: 'servicelist',
    component: ServicelistComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'addvehicle',
    component: AddvehicleComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'addservice',
    component: AddServiceComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'vehiclelist',
    component: CarlistComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'servicepage',
    component: ServicePageComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'updateVehicle',
    component: UpdatevehicleComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [CanActivateViaAdminAuthGuard]
  },
  {
    path: 'userinfo',
    component: UpdateuserComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'addbranch',
    component: AddBranchComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'addpricelist',
    component: AddPricelistComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'updateService',
    component: UpdateserviceComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'makereservation',
    component: MakeReservationComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'vehicletypes',
    component: VehicleTypesComponent,
    canActivate: [CanActivateViaAdminAuthGuard]
  },
  {
    path: 'updatebranch',
    component: UpdateBranchComponent
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
    AddPricelistComponent,
    UpdateuserComponent,
    UpdateserviceComponent,
    MakeReservationComponent,
    VehicleTypesComponent,
    UpdateBranchComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'}),
    NgxPayPalModule
  ],
  providers: [
    CanActivateViaAdminAuthGuard,
    ManagerGuard,
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
