import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  private errorMsg: string;
  private signInForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signInForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    const login: string = this.signInForm.get('login').value;
    const password: string = this.signInForm.get('password').value;
    this.authService.isUserAuthenticated(login, password).subscribe(auth => {
      if (auth) {
        const url: string = this.authService.getRedirectUrl();
        this.router.navigate([url]);
      }
      else {
        this.errorMsg = "Wrong login or password!";
      }
    })
  }

  redirectIfSignedIn(): void {
    if (this.authService.isUserSignedIn()) {
      const url: string = this.authService.getRedirectUrl();
      this.router.navigate([url]);
    }
  }

  ngOnInit() {
    this.redirectIfSignedIn();
  }

}
