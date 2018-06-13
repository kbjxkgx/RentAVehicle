import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/accountService/account.service';
import { Router } from '@angular/router';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { SocketserviceService } from '../services/socketservice/socketservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];

   public isLoggedIn: boolean;
   public isUser: boolean;
   public isAdmin: boolean;
   public isManager: boolean;
   public notificationExists: boolean;
  constructor( private router: Router, private data: CommunicationService, private accountService: AccountService, private socketService: SocketserviceService) {
    this.isConnected = false;
    this.notifications = [];
   }

  ngOnInit() {

    this.checkConnection();
    this.subscribeForNotifications();

    this.data.isAdminMessage.subscribe(message => this.isAdmin = message);
    this.data.isLoggedInMessage.subscribe(message => this.isLoggedIn = message);
    this.data.isManagerMessage.subscribe(message => this.isManager = message);
    this.data.isUserMessage.subscribe(message => this.isUser = message);


    if (localStorage.getItem('jwt'))
    {
      this.data.changeIsLoggedIn(true);
      // let role = localStorage.getItem("role");
      if (localStorage.getItem("role")=='Admin')
      {
        this.data.changeIsAdmin(true);
        this.data.changeIsManager(false);
        this.data.changeIsUser(false);
        this.router.navigate(['/home']);
      } else if (localStorage.getItem("role")=='Manager')
      {
        this.data.changeIsAdmin(false);
        this.data.changeIsManager(true);
        this.data.changeIsUser(false);
        this.router.navigate(['/home']);
      } else if (localStorage.getItem("role")=='AppUser')
      {
        this.data.changeIsAdmin(false);
        this.data.changeIsManager(false);
        this.data.changeIsUser(true);
        this.router.navigate(['/home']);
      }
    }
    else{ 
        this.data.changeIsLoggedIn(false);
        this.data.changeIsAdmin(false);
        this.data.changeIsManager(false);
        this.data.changeIsUser(false);
    }
  }

  Logout(): void {
    this.accountService.logout();
    this.data.changeIsLoggedIn(false);
    this.data.changeIsAdmin(false);
    this.data.changeIsUser(false);
    this.data.changeIsManager(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }

  Login(): void {
    this.router.navigate(['/login']);
  }

  Register(): void {
    this.router.navigate(['/register']);
  }

  private checkConnection(){
    this.socketService.connectionEstablished.subscribe(e => {this.isConnected = e; 
        if (e) {
          //this.socketService.sendHello()
        }
    });
  }

  private subscribeForNotifications () {
    this.socketService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: any) {

    this.notifications.push(notif);  

  //   this.ngZone.run(() => { 
  //     this.notifications.push(notif);  
  //  });  
 }


}
