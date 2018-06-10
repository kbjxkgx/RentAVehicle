import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private showUserMenu: boolean=true;
  private showAdmin: boolean=false;
  private showManager: boolean=false;
  
  constructor( private router: Router) { }

  ngOnInit() {
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
