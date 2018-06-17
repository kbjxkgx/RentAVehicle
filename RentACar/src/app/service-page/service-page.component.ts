import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css']
})
export class ServicePageComponent implements OnInit {
  service: any;
  branches: any;
  public isLoggedIn: boolean;
   public isUser: boolean;
   public isAdmin: boolean;
   public isManager: boolean;
   public notificationExists: boolean;
   public newCommentContent: string;
   private sub: any;
  constructor(private servicesService: ServicesService, private commentService: CommentService,
    private router: Router, private data: CommunicationService, private route: ActivatedRoute, private branchService: BranchService) { }

  ngOnInit() {
    this.data.isAdminMessage.subscribe(message => this.isAdmin = message);
    this.data.isLoggedInMessage.subscribe(message => this.isLoggedIn = message);
    this.data.isManagerMessage.subscribe(message => this.isManager = message);
    this.data.isUserMessage.subscribe(message => this.isUser = message);

    this.service = this.data.service;

    this.branchService.getBranches()
      .subscribe(
        data => {
          this.branches = data;
          console.log('getBranches succeded...');
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

  AddBranch() {
    this.data.service = this.service;
    this.router.navigate(['/addbranch']);
  }
}
