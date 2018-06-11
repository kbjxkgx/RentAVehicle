import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/accountService/account.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { CommunicationService } from '../services/communicationservice/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   public isLoggedIn: boolean;
   public isUser: boolean;
   public isAdmin: boolean;
   public isManager: boolean;
   public notificationExists: boolean;
  constructor( private router: Router, private data: CommunicationService, private accountService: AccountService) { }

  ngOnInit() {
    this.data.isAdminMessage.subscribe(message => this.isAdmin = message);
    this.data.isLoggedInMessage.subscribe(message => this.isLoggedIn = message);
    this.data.isManagerMessage.subscribe(message => this.isManager = message);
    this.data.isUserMessage.subscribe(message => this.isUser = message);
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

}
