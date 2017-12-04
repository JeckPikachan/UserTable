import { Component, OnInit } from '@angular/core';
import {IUser, User} from '../user';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Admin} from '../admin';
import {AuthService} from '../auth.service';
import {CONSTS} from '../CONSTS';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: IUser[];
  private admin: Admin;

  private selectedUser: User;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUsers();
    this.authService.getSignedInUser().subscribe(admin => this.admin = admin);
  }

  get filteredUsers() {
    return this.users.filter(user => user.getRole() == CONSTS.ROLE_USER);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  viewCurrentUser(user: User): void {
    this.router.navigate(['/users/detail', user.login]);
  }

  addUser(): void {
    this.router.navigate(['users/addUser']);
  }

  signOut(): void {
    this.authService.signOutUser();
  }
}
