import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginSubmit(product: any, form: NgForm) {
    console.log(product);
    this.loginService.login(product.username, product.password);
    form.reset();

    if(localStorage.getItem("role")=='Admin')
    {
      this.router.navigate(['/admin']);
    }

  }
}
