import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from '../services/servicesService/services.service';
import { CommunicationService } from '../services/communicationservice/communication.service';
import { CommentService } from '../services/commentService/comment.service';
import { Configuration } from '../Constants/constants';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { CommentModel } from '../models/CommentModel';


@Component({
  selector: 'app-servicelistitem',
  templateUrl: './servicelistitem.component.html',
  styleUrls: ['./servicelistitem.component.css']
})
export class ServicelistitemComponent implements OnInit {
  @Input() service: any;
   public isLoggedIn: boolean;
   public isUser: boolean;
   public isAdmin: boolean;
   public isManager: boolean;
   public notificationExists: boolean;
   public newCommentContent: string;
  constructor(private servicesService: ServicesService, private commentService: CommentService,
    private router: Router, private data: CommunicationService) { }

  ngOnInit() {
    this.data.isAdminMessage.subscribe(message => this.isAdmin = message);
    this.data.isLoggedInMessage.subscribe(message => this.isLoggedIn = message);
    this.data.isManagerMessage.subscribe(message => this.isManager = message);
    this.data.isUserMessage.subscribe(message => this.isUser = message);
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
          },
          error => {
            console.log(error);
          });

  }

  MoreInfo() {
    this.data.service = this.service;
    this.router.navigate(['/servicepage']);
  }

  Configuration() {
    return Configuration.path;
  }
}
