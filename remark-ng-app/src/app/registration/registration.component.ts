import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.component';
import {first} from 'rxjs/operators';
import {UserModel} from '../../models/user';
import {ApiService} from '../shared/api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private username = '';
  private password = '';
  public error = '';
  constructor(private router: Router, private authService: AuthenticationService, private apiService: ApiService) { }

  ngOnInit() {
  }
  createUser() {
    const newUser: UserModel = {
      id: null,
      username: `${this.username}`,
      password: `${this.password}`
    };
    this.apiService.postUser(newUser).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        alert('Error: createUser(username: string, password: string) function');
      }
    );
  }
}
