import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  private user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getSignedInUser().subscribe(user => {
      this.user = <User>user;
    })
  }

  signOut(): void {
    this.authService.signOutUser();
  }

}
