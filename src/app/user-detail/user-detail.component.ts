import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.route.params.subscribe(params => {
      let login: string = params['login'];
      console.log(login);
      this.userService.getUser(login)
        .subscribe(user => this.user = <User>user);
    });

  }

  goBack(): void {
    this.location.back();
  }

}
