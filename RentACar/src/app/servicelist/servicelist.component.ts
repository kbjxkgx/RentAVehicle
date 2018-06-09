import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {
  @Input() services: any;
  constructor() { }

  ngOnInit() {
  }

}
