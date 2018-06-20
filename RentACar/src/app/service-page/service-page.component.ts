import { Component, OnInit, Input } from '@angular/core';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { ServicesService } from '../services/servicesService/services.service';
import { CommentService } from '../services/commentService/comment.service';
import { CommentModel } from '../models/CommentModel';
import { BranchService } from '../services/branchService/branch.service';
import { Configuration } from '../Constants/constants';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { query } from '@angular/core/src/render3/query';
import { AppUserModel } from '../models/appUserModel';
import { VehicleService } from '../services/vehicleService/vehicle.service';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent implements OnInit {
  service: any;
  branches: any;
  vehicles: any;
  public isLoggedIn: boolean;
   public isUser: boolean;
   public isAdmin: boolean;
   public isManager: boolean;
   public notificationExists: boolean;
   public newCommentContent: string;
   public editCommentContent: string;
   private sub: any;
  constructor(private servicesService: ServicesService, private commentService: CommentService,
    private router: Router, private data: CommunicationService, private route: ActivatedRoute, private branchService: BranchService,
   private vehicleService: VehicleService) { }

  ngOnInit() {
    this.data.isAdminMessage.subscribe(message => this.isAdmin = message);
    this.data.isLoggedInMessage.subscribe(message => this.isLoggedIn = message);
    this.data.isManagerMessage.subscribe(message => this.isManager = message);
    this.data.isUserMessage.subscribe(message => this.isUser = message);

    this.service = this.data.service;

    this.branchService.getBranchesOfService(this.service.Id)
      .subscribe(
        data => {
          this.branches = data;
          console.log('getBranchesOfService succeded...');
        },
        error => {
          console.log(error);
        });

    this.servicesService.getVehicles(this.service.Id)
      .subscribe(
        data => {
          this.vehicles = data;
          console.log('getVehicles succeded...');
        },
        error => {
          console.log(error);
        });
  }

  ConfirmService() {
    this.service.IsConfirmed = true;
    this.servicesService.ConfirmService(this.service);
    this.router.navigate(['/admin']);
  }

  AddComment() {
    let comment = new CommentModel();
    comment.UserId = this.data.AppUserIdSource.value;
    comment.Content = this.newCommentContent;
    comment.CommentedServiceId = this.service.Id;
    this.commentService.addComment(comment)
        .subscribe(
          data => {
            console.log('addComment succeded...');
            data.User = this.data.user;
            this.service.Comments.push(data);
          },
          error => {
            console.log(error);
          });
  }

  EditComment() {
    for (let comment of this.service.Comments) {
      if(comment.UserId == this.data.AppUserIdSource.value)
      {
        let comm = new CommentModel();
        comm.UserId = this.data.AppUserIdSource.value;
        comm.Content = this.editCommentContent;
        comm.CommentedServiceId = this.service.Id;
        comm.Id = comment.Id;
        this.commentService.editComment(comm)
          .subscribe(
            data => {
              console.log('editComment succeded...');
              comment.Content = comm.Content;
              return;
            },
            error => {
              console.log(error);
              return;
            });
        return;
      }
    }

    window.alert('You dont have a comment');
  }

  AddBranch() {
    this.data.service = this.service;
    this.router.navigate(['/addbranch']);
  }

  AddPricelist() {
    this.data.service = this.service;
    this.router.navigate(['/addpricelist']);
  }

  Configuration() {
    return Configuration.path;
  }

  Delete() {
        console.log('Delete vehicles succeded');
        this.servicesService.delete(this.service)
        .subscribe(
          data => {
            console.log('delete service succeded...');
            this.router.navigate(['/servicelist']);
          },
          error => {
            console.log('delete service failed...');
          });
  }

  Update() {
    this.data.serviceForUpdate = this.service;
    this.router.navigate(['/updateService']);
  }

}
