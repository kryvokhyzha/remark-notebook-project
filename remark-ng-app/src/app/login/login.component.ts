import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators/';
import {ApiService} from '../shared/api.service';

import { AuthenticationService } from '../authentication/authentication.component';
import {UserModel} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public currentUser: UserModel = {
    id: null,
    username: '',
    password: ''
  };
  private username = '';
  private password = '';
  public error = '';

  constructor(private router: Router, private authService: AuthenticationService, private apiService: ApiService) {
  }

  onSubmit() {
    this.authService.login(this.username, this.password).pipe(first()).subscribe(res => {
        if (res instanceof Error) {
          this.error = res.message;
        } else {
          this.currentUser = res;
          this.router.navigate(['notes']);
          this.error = '';
        }
      }
    );
  }
}
