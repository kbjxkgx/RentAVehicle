import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from '../services/servicesService/services.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'app-servicelistitem',
  templateUrl: './servicelistitem.component.html',
  styleUrls: ['./servicelistitem.component.css']
})
export class ServicelistitemComponent implements OnInit {
  @Input() service: any;
  constructor(private servicesService: ServicesService, private router: Router) { }

  ngOnInit() {
  }

  ConfirmService()
  {
    this.service.IsConfirmed = true;
    this.servicesService.ConfirmService(this.service);
    this.router.navigate(['/admin']);
  }

}
