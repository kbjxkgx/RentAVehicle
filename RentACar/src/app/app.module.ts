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
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { ServicelistitemComponent } from './servicelistitem/servicelistitem.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { CommunicationService } from './services/communicationservice/communication.service';
import { ManagerlistComponent } from './managerlist/managerlist.component';
import { ManagerlistitemComponent } from './managerlistitem/managerlistitem.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserlistitemComponent } from './userlistitem/userlistitem.component';
import { AddServiceComponent } from './add-service/add-service.component';


const Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
   },
  {
    path: 'home',
    component: MainpageComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'manager',
    component: ManagerComponent,
  },
  {
    path: 'managers',
    component: ManagerlistComponent,
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
  },
  {
    path: 'servicelist',
    component: ServicelistComponent,
  },
  {
    path: 'addvehicle',
    component: AddvehicleComponent,
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
    AdminComponent,
    ManagerComponent,
    ServicelistComponent,
    ServicelistitemComponent,
    VerifyAccountComponent,
    ManagerlistComponent,
    ManagerlistitemComponent,
    UserlistComponent,
    UserlistitemComponent,
    AddServiceComponent
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
    CommunicationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
