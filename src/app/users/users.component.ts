import { Component, OnInit } from '@angular/core';
import {IUser, User} from '../user';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Admin} from '../admin';
import {AuthService} from '../auth.service';
import {CONSTS} from '../CONSTS';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: IUser[];
  private admin: Admin;
  private pdfSrc;
  private pdf;
  private pdfData;
  private isDataValid = true;
  private page = 1;

  private selectedUser: User;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
    this.authService.getSignedInUser().subscribe(admin => this.admin = admin);
    this.getPdf();
  }

  getPdf(): void {
    this.pdfSrc = './assets/' + CONSTS.PDF_SRC; //'data:application/pdf;base64,'
    this.http.get(this.pdfSrc, {responseType: 'text'}).subscribe(data => {
      this.pdfData = 'data:application/pdf;base64,' + data;
    })
  }

  afterLoadComplete(pdf) {
    this.pdf = pdf;
  }

  onError(err) {
    this.isDataValid = false;
  }

  toFirstPage(): void {
    this.page = 1;
  }

  toLastPage(): void {
    if (this.pdf)
     this.page = this.pdf.numPages;
  }

  nextPage(): void {
    this.page = this.pdf && this.page < this.pdf.numPages ? this.page + 1 : this.page;
  }

  prevPage(): void {
    this.page = this.pdf && this.page > 1 ? this.page - 1 : this.page;
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
