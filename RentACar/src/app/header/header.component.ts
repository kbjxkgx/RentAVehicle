import { Component, OnInit } from '@angular/core';
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
  constructor( private router: Router, private data: CommunicationService) { }

  ngOnInit() {
    this.data.isAdminMessage.subscribe(message => this.isAdmin = message);
    this.data.isLoggedInMessage.subscribe(message => this.isLoggedIn = message);
    this.data.isManagerMessage.subscribe(message => this.isManager = message);
    this.data.isUserMessage.subscribe(message => this.isUser = message);
  }

  Logout(): void {

  }

  Login(): void {
    this.router.navigate(['/login']);
  }

  Register(): void {
    this.router.navigate(['/register']);
  }

}
